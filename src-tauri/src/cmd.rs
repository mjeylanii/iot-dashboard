use eyre::{ContextCompat, Result};
use network::{Host, SelectInterface};
use std::process::Command;

use serde::Serialize;
use tauri::Manager;

use which::which;

use netdev::get_default_gateway;

#[tauri::command]
pub fn get_interfaces() -> Result<Vec<SelectInterface>> {
    let interfaces = network::get_interfaces();

    Ok(interfaces)
}

#[tauri::command]
pub async fn scan_network(interface: SelectInterface) -> Result<Vec<Host>> {
    let interfaces = network::get_interfaces();

    let selected = interfaces
        .iter()
        .find(|i| i.index == interface.index)
        .context("not found")?;

    let found = network::scan(selected);

    found
}

#[cfg(any(windows, target_os = "macos"))]
#[tauri::command]
pub async fn close_splashscreen(window: tauri::WebviewWindow) {
    if let Some(splashscreen) = window.webview_windows().get("splashscreen") {
        splashscreen.close().unwrap();
    }

    window
        .webview_windows()
        .get("login")
        .unwrap()
        .show()
        .unwrap();
}

#[tauri::command]
pub async fn close_login(window: tauri::Window) {
    if let Some(login) = window.webview_windows().get("login") {
        login.close().unwrap();
    }

    window
        .webview_windows()
        .get("main")
        .unwrap()
        .show()
        .unwrap();
}

#[tauri::command]
pub async fn open_main(window: tauri::Window) {
    if let Some(main) = window.webview_windows().get("main") {
        main.show().unwrap();
    }
}

#[tauri::command]
pub async fn close_main(window: tauri::Window) {
    if let Some(main) = window.webview_windows().get("main") {
        main.close().unwrap();
    }
}

#[tauri::command]
pub async fn open_login(window: tauri::WebviewWindow) {
    if let Some(login) = window.webview_windows().get("login") {
        login.show().unwrap();
    }
}

#[derive(Serialize)]
struct Device {
    hostname: String,
    ip: String,
    mac: String,
    manufacturer: String,
}

#[tauri::command]
pub async fn get_network_devices() -> Result<String> {
    let gateway = match get_default_gateway() {
        Ok(gateway) => {
            let gateway_str = gateway
                .ipv4
                .iter()
                .map(|ip| ip.to_string())
                .collect::<Vec<_>>()
                .join(", ");
            gateway_str
        }

        Err(_) => {
            let json_string = serde_json::to_string(&"No default gateway found")?;
            return Ok(json_string);
        }
    };

    let args = vec!["-sn", &gateway, "/24"];

    let result = which("nmap").unwrap();

    println!("Found rustc at {:?}", result);

    let command = if which("nmap").is_ok() {
        if cfg!(target_os = "macos") || cfg!(target_os = "linux") {
            "sudo nmap"
        } else {
            "nmap"
        }
    } else {
        println!(
            "Nmap is not installed on your system. Please install Nmap to get better results."
        );
        "./nmap"
    };

    let output = Command::new(command).args(args).output()?;
    println!("output: {:?}", output);
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
