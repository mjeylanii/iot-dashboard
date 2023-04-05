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

use serde::Serialize;
use std::process::Command;
use std::str;
use tauri::{Error, Result};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_websocket::init())
        .invoke_handler(tauri::generate_handler![get_devices])
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
    let gateway = get_default_gateway().await.unwrap();
    print!("Gateway: {}", gateway);
    let command = "./nmap";
    let output = Command::new(command)
        .args(&["-sn".to_owned() + &gateway + "/24"])
        .output()?;
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

#[cfg(target_os = "windows")]
async fn get_default_gateway() -> Option<String> {
    let output = Command::new("ipconfig")
        .arg("/all")
        .output()
        .expect("Failed to execute ipconfig command");

    let output_str = str::from_utf8(&output.stdout).unwrap();

    // Search for the "Default Gateway" line in the ipconfig output
    let default_gateway_line = output_str
        .lines()
        .find(|line| line.contains("Default Gateway"))?;

    // Extract the IP address from the "Default Gateway" line
    let default_gateway = default_gateway_line
        .split_whitespace()
        .last()
        .map(|s| s.to_string())?;

    Some(default_gateway)
}

#[cfg(target_os = "unix")]
async fn get_default_gateway() -> Option<String> {
    let output = Command::new("ifconfig")
        .output()
        .expect("Failed to execute ifconfig command");

    let output_str = str::from_utf8(&output.stdout).unwrap();

    // Search for the "default" line in the ifconfig output
    let default_line = output_str.lines().find(|line| line.contains("default"))?;

    // Extract the IP address from the "default" line
    let default_gateway = default_line
        .split_whitespace()
        .nth(1)
        .map(|s| s.to_string())?;

    Some(default_gateway)
}
