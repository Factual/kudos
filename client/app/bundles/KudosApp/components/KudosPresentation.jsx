import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { chunk, map } from 'lodash'
import AppStore from '../stores/AppStore'
import { UserAvatar } from './Kudo'
import { HeaderStripes } from './Header'

@observer
export class KudosPresentation extends React.Component {
  render() {
    return AppStore.kudosStore.isFetchingKudos ? <Spinner /> : <Slideshow />
  }
}

const SlideshowContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`

const BottomStripes = styled.div`
  margin-top: 45%;
  display: grid;
  grid: repeat(3, 60px) / repeat(5, 1fr);
  transform: skewY(-10deg);
  transform-origin: 0;
`

const FirstStripe = styled.span`
  background-color: #fffacb;
  grid-row: 1;
  grid-column: span 5;
`

const SecondStripe = styled.span`
  background-color: #fecf8c;
  grid-row: 2;
  grid-column: span 5;
`

const ThirdStripe = styled.span`
  background-color: #f68a1e;
  grid-row: 3;
  grid-column: span 5;
`

@observer
class Slideshow extends React.Component {
  constructor() {
    super()
    this.state = {
      currentKudo: 0,
    }
    setTimeout(this.changeSlide, 10000)
  }

  componentDidUpdate() {
    setTimeout(this.changeSlide, 10000)
  }

  changeSlide = () => {
    let nextKudo = this.state.currentKudo + 1
    if (nextKudo === AppStore.kudosStore.kudos.length) {
      nextKudo = 0
    }

    this.setState({ currentKudo: nextKudo })
  }

  render() {
    return (
      <div>
        <HeaderStripes />
        <img src="assets/kudos_logo.png" className="header-logo" />
        <SlideshowContainer>
          <Kudo kudo={AppStore.kudosStore.kudos[this.state.currentKudo]} />
        </SlideshowContainer>
        <BottomStripes>
          <FirstStripe />
          <SecondStripe />
          <ThirdStripe />
        </BottomStripes>
      </div>
    )
  }
}

const KudoWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const KudoContainer = styled.div`
  color: #ffffff;
  background-color: ${props => props.color};
  width: 80%;
  padding: 1em;
  padding-left: 18%;
  margin-left: -15%;
  z-index: -10;
`

const Receiver = styled.div`
  margin-bottom: 1rem;
  font-family: Gotham SSm A, Gotham SSm B, Helvetica Neue, Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;
`

const ReceiverAvatar = styled.img`
  height: 33vh;
  border-radius: 9999px;
  border: 2px solid ${props => props.color};
`

@observer
class Kudo extends React.Component {
  render() {
    const { kudo } = this.props
    const recipients = map(kudo.receivers, 'name').join(', ')
    const color = (colorClass => {
      switch (colorClass) {
        case 'kudo-teal':
          return '#4bbcd3'
        case 'kudo-lime':
          return '#99ca3c'
        default:
          return '#f68a1e'
      }
    })(kudo.colorClass)

    return (
      <KudoWrapper>
        <ReceiverAvatar color={color} src={kudo.receivers[0].avatar || 'default-avatar.jpeg'} />
        <KudoContainer color={color}>
          <Receiver>{`Kudos, ${recipients}!`}</Receiver>
          <div>{kudo.body}</div>
        </KudoContainer>
      </KudoWrapper>
    )
  }
}

function Spinner() {
  return (
    <div className="kudos-list__fetching-container">
      <i className="fas fa-spin fa-spinner fa-5x" aria-hidden="true" />
    </div>
  )
}

export default KudosPresentation
