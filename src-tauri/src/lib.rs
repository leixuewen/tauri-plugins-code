// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            #[cfg(desktop)]
            {
                let _ = handle.plugin(tauri_plugin_autostart::init(
                    tauri_plugin_autostart::MacosLauncher::LaunchAgent,
                    Some(vec!["--flag1", "--flag2"]), /* 传递给应用程序的任意数量的参数 */
                ));
                let _ = handle.plugin(tauri_plugin_cli::init());
            }

            #[cfg(mobile)]
            {
                let _ = handle.plugin(tauri_plugin_barcode_scanner::init());
                let _ = handle.plugin(tauri_plugin_biometric::init());
            }

            Ok(())
        })
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
