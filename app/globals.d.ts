// Allow side-effect imports of plain CSS files (e.g. import './globals.css')
declare module '*.css' {
  const styles: Record<string, string>
  export default styles
}

interface Window {
  webkitAudioContext?: typeof AudioContext
}
