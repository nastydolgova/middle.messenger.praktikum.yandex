import Block from './Block'

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app')

  root!.innerHTML = ''
  console.log(block)
  root!.appendChild(block.getContent())
}
