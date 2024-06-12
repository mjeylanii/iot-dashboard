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

mod cmd;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            cmd::close_login,
            cmd::close_main,
            cmd::close_splashscreen,
            cmd::get_network_devices,
            cmd::open_main,
            cmd::open_login,
            cmd::scan_network,
            cmd::get_interfaces,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
