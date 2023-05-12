#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "macos"
)]
#![cfg_attr(
    all(not(debug_assertions), target_os = "linux"),
    windows_subsystem = "linux"
)]

use default_net::get_default_gateway;

use serde::Serialize;
use std::env;
use std::process::Command;
use tauri::Manager;
use tauri::Result;
use tauri_plugin_store::StoreBuilder;
use which::which;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    println!(
        "The current directory is {}",
        env::current_dir().unwrap().display()
    );
    println!("You have invoked the close_splashscreen command");
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_devices, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Serialize)]
struct Device {
    hostname: String,
    ip: String,
    mac: String,
    manufacturer: String,
}

#[tauri::command]
async fn get_devices() -> Result<String> {
    let gateway = match get_default_gateway() {
        Ok(gateway) => gateway.ip_addr.to_string(),
        Err(_) => {
            println!("No default gateway found");
            return Ok("".to_string());
        }
    };
    let args = vec!["-sn", &gateway, "/24"];
    let result = which("nmap").unwrap();
    println!("Found rustc at {:?}", result);
    let command = if which("nmap").is_ok() {
        "nmap"
    } else {
        println!(
            "Nmap is not installed on your system. Please install Nmap to get better results."
        );
        "./nmap"
    };

    let output = Command::new(command).args(args).output()?;
    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut devices = Vec::new();
    for line in stdout.lines() {
        if line.contains("Nmap scan report for") {
            let mut device = Device {
                hostname: String::new(),
                ip: String::new(),
                mac: String::new(),
                manufacturer: String::new(),
            };
            let mut hostname = line.split("Nmap scan report for ");
            hostname.next();
            let hostname_str = hostname.next().unwrap_or("").trim().to_owned();
            if hostname_str.contains(" (") {
                let hostname_parts = hostname_str.split(" (").collect::<Vec<_>>();
                device.hostname = hostname_parts[0].to_owned();
                device.ip = hostname_parts[1].replace(")", "");
            } else {
                device.ip = hostname_str.to_owned();
            }
            devices.push(device);
        }
        if line.contains("MAC Address:") {
            println!("MAC: {}", line);
            let mac_info = line
                .split("MAC Address:")
                .nth(1)
                .unwrap_or("")
                .trim()
                .to_owned();
            let mac_parts = mac_info.split(" ").collect::<Vec<_>>();
            if let Some(mac) = mac_parts.get(0) {
                devices.last_mut().unwrap().mac = mac.to_string();
            }
            if let Some(manufacturer) = mac_parts.get(1..) {
                let manufacturer_str = manufacturer.join(" ");
                let manufacturer_clean = manufacturer_str
                    .replace("(", "")
                    .replace(")", "")
                    .trim()
                    .to_owned();
                devices.last_mut().unwrap().manufacturer = manufacturer_clean;
            }
        }
    }
    let json_string = serde_json::to_string(&devices)?;
    Ok(json_string)
}
