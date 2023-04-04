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

use serde::{Deserialize, Serialize};
use serde_json::json;
use std::process::Command;
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
    mac: String,
}
#[tauri::command]
async fn get_devices() -> Result<String> {
    //Print hello from rust
    println!("Hello from rust");

    //run nmap and parse the output
    let output = Command::new("C:\\Program Files (x86)\\Nmap\\nmap.exe")
        .args("-sn 192.168.1.1/24".split_whitespace())
        .output()?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr: String = String::from_utf8_lossy(&output.stderr).to_string();
    let mut devices = Vec::new();

    for line in stdout.lines() {
        if line.contains("Nmap scan report for") {
            let mut device = Device {
                hostname: String::new(),
                mac: String::new(),
            };
            let mut hostname = line.split("Nmap scan report for");
            hostname.next();
            device.hostname = hostname.next().unwrap().to_string();
            devices.push(device);
        }
        if line.contains("MAC Address:") {
            let mut mac = line.split("MAC Address:");
            mac.next();
            devices.last_mut().unwrap().mac = mac.next().unwrap().to_string();
        }
    }

    println!("{}", json!(devices).to_string());

    Ok(json!(devices).to_string())
}
