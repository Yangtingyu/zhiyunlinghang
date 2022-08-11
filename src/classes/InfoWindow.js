const { AMap } = window

export default class InfoWindow extends AMap.InfoWindow {
  constructor() {
    const box = document.createElement('div')
    box.className = 'info-window box p-15 pen'
    const title = document.createElement('div')
    title.className = 'c-blue b f-16 mb-10'
    const data1 = document.createElement('div')
    const data2 = document.createElement('div')
    const data3 = document.createElement('div')
    title.innerText = '标题'
    data1.innerHTML = '<span class="f1 mr-15">工业企业 </span><span class="c-blue f-16 b">' + 0 + '</span>'
    data2.innerHTML = '<span class="f1 mr-15">平台</span><span class="c-blue f-16 b">' + 0 + '</span>'
    data3.innerHTML = '<span class="f1 mr-15">联网设备</span><span class="c-blue f-16 b">'+0+'</span>'
    data1.className = data2.className = data3.className = 'fr ac mt-5'
    box.appendChild(title)
    box.appendChild(data1)
    box.appendChild(data2)
    box.appendChild(data3)

    super({
      isCustom: true,
      content: box,
      offset: new AMap.Pixel(10, -50),
      anchor: 'bottom-center'
    })
    this.title = title
    this.data1 = data1
    this.data2= data2
    this.data3 = data3
  }

  setTitle(title) {
    this.title.innerText = title
  }

  setData(data) {
    // TO DO...
    this.data1.innerHTML = '<span class="f1 mr-15">工业企业</span><span class="c-blue f-16 b">' + data.a + '</span>'
    this.data2.innerHTML = '<span class="f1 mr-15">平台</span><span class="c-blue f-16 b">' + data.b + '</span>'
    this.data3.innerHTML = '<span class="f1 mr-15">联网设备</span><span class="c-blue f-16 b">'+data.c+'</span>'
  }
}
