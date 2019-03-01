interface SettingsInterface {
  throttle: number
  debounce: number
  mapStyle: any
}

const Settings: SettingsInterface = {
  throttle: 100,
  debounce: 150,
  mapStyle: [],
}

export default Settings
