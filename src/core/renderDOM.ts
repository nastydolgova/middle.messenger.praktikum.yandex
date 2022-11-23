import Block from './Block'

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app')
  if (root) {
    root!.innerHTML = ''
    const content= block.getContent()
    if(content){
      root!.appendChild(block.getContent())
    }
  }
}
