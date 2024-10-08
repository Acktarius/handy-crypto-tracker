import './style.css'
import { App } from './App'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"></div>
`

const app = new App(document.querySelector<HTMLDivElement>('#root')!)
app.render()