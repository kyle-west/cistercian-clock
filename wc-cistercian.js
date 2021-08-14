class Cistercian extends HTMLElement {
  static get configAttributes ()   { return [ 'width', 'height', 'color' ]; }
  static get observedAttributes () { return [ ...Cistercian.configAttributes, 'value']; }

  constructor (...args) {
    super(...args)
    this.attachShadow({mode: 'open'});
    this.props = { width: 250, height: 250, color: '#fff', value: 0 };
  }
  
  connectedCallback () {
    this.render()
    this.fitNumber()
  }

  attributeChangedCallback (attr, oldVal, newVal) {
    this.props[attr] = newVal;
    if (oldVal !== newVal) {
      if (Cistercian.configAttributes.includes(attr)) {
        this.render()
      } else if (attr === 'value') {
        this.fitNumber()
      }
    }
  }

  getLines () {
    return Object.fromEntries(
      [...this.shadowRoot.querySelectorAll('svg line[id]')].map(line => [line.id, line])
    )
  }

  setAttrs (elem, dims) {
    if (elem) {
      let allZeros = true
      Object.entries(dims).forEach(([key, value]) => {
        if (value !== 0) allZeros = false
        elem.setAttribute(key, value)
      })
      if (allZeros) elem.classList.add('hidden')
      else elem.classList.remove('hidden')
    }
  }

  fitComboLines (left, right, matches) {
    // FULL  x1="100" 
    // LEFT  x1="50"
    // RIGHT x1="50" x2="100"
    const L = matches.includes(left)  
    const R = matches.includes(right) 
    const FULL = L && R
    return {
      x1: FULL ? 100 : (L || R ? 50 : 0),
      x2: R && !FULL ? 100 : 0,
    }
  }

  fitNumber () {
    const [BL, BR, TL, TR] = [...this.props.value.toString().padStart(4, 0)].map(Number)
    const Lines = this.getLines()

    this.setAttrs(Lines.Top, this.fitComboLines(TL, TR, [1,5,7,9]))
    
    this.setAttrs(Lines.TopLeft, { y2: TL > 5 ? 50 : 0 })
    this.setAttrs(Lines.TopLeftDiagonalInward, {
      x1: TL === 3 ? 50 : 0,
      y2: TL === 3 ? 50 : 0
    })
    this.setAttrs(Lines.TopLeftDiagonalOutward, {
      x1: [4, 5].includes(TL) ? 50 : 0,
      y1: [4, 5].includes(TL) ? 50 : 0
    })
    
    this.setAttrs(Lines.TopRight, { y2: TR > 5 ? 50 : 0 })
    this.setAttrs(Lines.TopRightDiagonalInward, {
      x1: TR === 3 ? 50 : 0,
      y1: TR === 3 ? 50 : 0
    })
    this.setAttrs(Lines.TopRightDiagonalOutward, {
      x1: [4, 5].includes(TR) ? 50 : 0,
      y2: [4, 5].includes(TR) ? 50 : 0
    })
    
    this.setAttrs(Lines.MiddleTop, this.fitComboLines(TL, TR, [2,8,9]))

    this.setAttrs(Lines.MiddleBottom, this.fitComboLines(BL, BR, [2,8,9]))
    
    this.setAttrs(Lines.BottomLeft, { y2: BL > 5 ? 50 : 0 })
    this.setAttrs(Lines.BottomLeftDiagonalInward, {
      x1: BL === 3 ? 50 : 0,
      y1: BL === 3 ? 50 : 0
    })
    this.setAttrs(Lines.BottomLeftDiagonalOutward, {
      x1: [4, 5].includes(BL) ? 50 : 0,
      y2: [4, 5].includes(BL) ? 50 : 0
    })
    
    this.setAttrs(Lines.BottomRight, { y2: BR > 5 ? 50 : 0 })
    this.setAttrs(Lines.BottomRightDiagonalInward, {
      x1: BR === 3 ? 50 : 0,
      y2: BR === 3 ? 50 : 0
    })
    this.setAttrs(Lines.BottomRightDiagonalOutward, {
      x1: [4, 5].includes(BR) ? 50 : 0,
      y1: [4, 5].includes(BR) ? 50 : 0
    })
    
    this.setAttrs(Lines.Bottom, this.fitComboLines(BL, BR, [1,5,7,9]))
  }

  render () {
    const { width, height, color } = this.props;
    return this.shadowRoot.innerHTML = (`
      <style>
        .hidden {
          display: none;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 125 175">
        <defs>
          <filter id="CenterStyles" x="51.036" y="1.286" width="23" height="173" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopStyles" x="1.286" y="1.286" width="122.5" height="23" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-2"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-2"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomStyles" x="1.286" y="151.286" width="122.5" height="23" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-3"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-3"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="MiddleTopStyles" x="1.286" y="51.286" width="122.5" height="23" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-4"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-4"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="MiddleBottomStyles" x="1.286" y="101.286" width="122.5" height="23" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-5"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-5"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopRightStyles" x="100.786" y="1.286" width="23" height="73" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-6"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-6"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomRightStyles" x="100.786" y="101.286" width="23" height="73" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-7"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-7"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomLeftStyles" x="1.286" y="101.286" width="23" height="73" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-8"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-8"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopLeftStyles" x="1.286" y="1.286" width="23" height="73" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-9"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-9"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopLeftDiagonalInwardStyles" x="0" y="0.25" width="75.071" height="74.821" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-10"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-10"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopLeftDiagonalOutwardStyles" x="0" y="0" width="75.071" height="75.071" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-11"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-11"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopRightDiagonalInwardStyles" x="50" y="0.25" width="75.071" height="75.071" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-12"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-12"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="TopRightDiagonalOutwardStyles" x="50" y="0.375" width="75.071" height="74.821" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-13"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-13"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomLeftDiagonalOutwardStyles" x="0.25" y="100.25" width="75.071" height="74.821" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-14"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-14"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomLeftDiagonalInwardStyles" x="0.25" y="100" width="75.071" height="75.071" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-15"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-15"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomRightDiagonalOutwardStyles" x="50" y="100.25" width="75.071" height="75.071" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-16"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-16"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="BottomRightDiagonalInwardStyles" x="50.25" y="100.375" width="75.071" height="74.821" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-17"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-17"/>
            <feComposite in="SourceGraphic"/>
          </filter>
        </defs>
        <g filter="url(#CenterStyles)">
          <line id="Center" y2="150" transform="translate(62.54 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopStyles)">
          <line id="Top" x1="100" transform="translate(12.79 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomStyles)">
          <line id="Bottom" x1="100" transform="translate(12.79 159.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#MiddleTopStyles)">
          <line id="MiddleTop" x1="100" transform="translate(12.79 59.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#MiddleBottomStyles)">
          <line id="MiddleBottom" x1="100" transform="translate(12.79 109.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopRightStyles)">
          <line id="TopRight" y2="50" transform="translate(112.29 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomRightStyles)">
          <line id="BottomRight" y2="50" transform="translate(112.29 109.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomLeftStyles)">
          <line id="BottomLeft" y2="50" transform="translate(12.79 109.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopLeftStyles)">
          <line id="TopLeft" y2="50" transform="translate(12.79 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopLeftDiagonalInwardStyles)">
          <line id="TopLeftDiagonalInward" x1="50" y2="50" transform="translate(12.54 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopLeftDiagonalOutwardStyles)">
          <line id="TopLeftDiagonalOutward" x1="50" y1="50" transform="translate(12.54 9.54)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopRightDiagonalInwardStyles)">
          <line id="TopRightDiagonalInward" x1="50" y1="50" transform="translate(62.29 9.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#TopRightDiagonalOutwardStyles)">
          <line id="TopRightDiagonalOutward" x1="50" y2="50" transform="translate(62.54 9.91)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomLeftDiagonalOutwardStyles)">
          <line id="BottomLeftDiagonalOutward" x1="50" y2="50" transform="translate(12.79 109.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomLeftDiagonalInwardStyles)">
          <line id="BottomLeftDiagonalInward" x1="50" y1="50" transform="translate(12.79 109.54)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomRightDiagonalOutwardStyles)">
          <line id="BottomRightDiagonalOutward" x1="50" y1="50" transform="translate(62.54 109.79)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
        <g filter="url(#BottomRightDiagonalInwardStyles)">
          <line id="BottomRightDiagonalInward" x1="50" y2="50" transform="translate(62.79 109.91)" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>
        </g>
      </svg>
    `)
  }
}

window.customElements.define('wc-cistercian', Cistercian);