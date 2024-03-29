'use client'
import styles from '@/styles/componentStyles/Hamburger.module.css'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Hamburger(props: any) {
  const HamburgerItem = dynamic(() => import('@/components/HamburgerItem'))

  const router = useRouter()
  const items: Record<string, any>[] = [
    {
      id: 1,
      href: '/',
      name: 'Home',
    },
    {
      id: 2,
      href: '/profile',
      name: 'Profile',
    },
    {
      id: 3,
      href: props.user ? 'api/auth/logout' : 'api/auth/login',
      name: props.user ? 'Logout' : 'Login',
    },
  ]
  const [isOpen, setIsOpen] = useState(false)

  const useKeyPress = function (targetKey: any) {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(() => {
      const downHandler = ({ key }: any) => {
        if (key === targetKey) {
          setKeyPressed(true)
        }
      }

      const upHandler = ({ key }: any) => {
        if (key === targetKey) {
          setKeyPressed(false)
        }
      }

      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)

      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }, [targetKey])

    return keyPressed
  }

  const [selected, setSelected]: any = useState(undefined)
  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')
  const [cursor, setCursor] = useState(-1)
  const [hovered, setHovered]: any = useState(undefined)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (items.length && downPress) {
      setCursor((prevState) => (prevState < items.length - 1 ? prevState + 1 : prevState))
    }
  }, [downPress])
  useEffect(() => {
    if (items.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [upPress])
  useEffect(() => {
    if (items.length && isOpen && enterPress) {
      setSelected(items[cursor])
      router.push(items?.[cursor]?.href)
    }
  }, [cursor, enterPress])
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(hovered?.id - 1)
    }
  }, [hovered])
  useEffect(() => {
    if (selected) {
      router.push(selected?.href)
    }
  }, [selected])

  return (
    <>
      <div className={styles.hamburgerContainer} >
        <div className={styles.circle} onClick={() => toggleOpen()}>
          <Image
            width={32}
            height={0}
            src="/hamburger.svg"
            alt="Hamburger dropdown list"
            loading="lazy"
            style={{ height: '50%', width: '50%' }}
          />
        </div>
        {isOpen && (
          <>
          <div className={styles.burgerBackground} onClick={() => setIsOpen(false)} ></div>
          <div className={styles.burgerDropdownCLOSE}>
            {items.map((item, i) => (
              <HamburgerItem
                className="burger"
                key={item.id}
                actives={i === cursor}
                item={item}
                setSelected={setSelected}
                setHovered={setHovered}
              />
            ))}
          </div>
          </>
        )}
      </div>
    </>
  )
}

export default Hamburger
