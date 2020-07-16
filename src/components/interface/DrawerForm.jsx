import React, { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd'

function DrawerForm({
  children,
  type,
  buttonTitile,
  drawerTitle,
  block,
  ghost,
  icon,
  width,
  disabled,
  bodyStyle
}) {
  const [visible, setVisible] = useState(false)
  const size = useWindowSize()

  const openDrawer = () => {
    setVisible(true)
  }

  const closeDrawer = () => {
    setVisible(false)
  }

  const newChildren = React.cloneElement(children, {
    closeDrawer
  })

  const getDefaultWidth = () => {
    const calWidth = size.width
    if (calWidth >= 1200) {
      return calWidth * 0.3
    } else if (calWidth >= 992) {
      return calWidth * 0.4
    } else if (calWidth >= 768) {
      return calWidth * 0.5
    } else if (calWidth >= 576) {
      return calWidth * 0.6
    } else {
      return calWidth
    }
  }

  return (
    <>
      <Button
        icon={icon}
        type={type}
        block={block}
        ghost={ghost}
        onClick={openDrawer}
        disabled={disabled}
      >
        {buttonTitile}
      </Button>
      <Drawer
        width={width || getDefaultWidth()}
        placement='right'
        title={
          icon ? (
            <>
              {icon}&nbsp;{drawerTitle}
            </>
          ) : (
            <>{drawerTitle}</>
          )
        }
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={bodyStyle}
      >
        {newChildren}
      </Drawer>
    </>
  )
}

DrawerForm.defaultProps = {
  width: undefined
}

export default DrawerForm

const useWindowSize = () => {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      const newSize = getSize()
      if (
        windowSize.height !== newSize.height ||
        windowSize.width !== newSize.width
      ) {
        setWindowSize(newSize)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
