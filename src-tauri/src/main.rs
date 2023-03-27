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
use tauri::{Error, Manager, Result, Window, WindowBuilder, WindowUrl};

#[derive(Serialize, Debug)]
struct Devices {
    name: String,
    description: String,
    ip: String,
    mac: String,
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_devices])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

//Get all devices on network using mdns
