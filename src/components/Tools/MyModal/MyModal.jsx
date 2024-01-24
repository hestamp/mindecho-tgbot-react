import React from 'react'
import styles from './MyModal.module.css'

import { MdOutlineClose } from 'react-icons/md'
import * as Dialog from '@radix-ui/react-dialog'

const MyClose = React.forwardRef((props, ref) => (
  <MdOutlineClose {...props} ref={ref} />
))

const MyModal = ({
  canClose,
  modalName,
  myTrigger,
  setLocModal,
  myJustifyName,
  isOpen,
  modalText,
  children,
  fullscreen,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>{myTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setLocModal && setLocModal()}
          className={styles.DialogOverlay}
        />
        <Dialog.Content
          className={`${styles.DialogContent} ${
            fullscreen && styles.maxparams
          }`}
        >
          {modalName ? (
            <Dialog.Title
              style={{ justifyContent: myJustifyName }}
              className={styles.DialogTitle}
            >
              <span>{modalName}</span>
            </Dialog.Title>
          ) : (
            <></>
          )}

          {modalText ? (
            <Dialog.Description className={styles.DialogDescription}>
              {modalText}
            </Dialog.Description>
          ) : (
            <></>
          )}

          {children ? children : <></>}

          {canClose ? (
            <Dialog.Close asChild>
              <MyClose
                onClick={() => setLocModal && setLocModal()}
                className={styles.IconButton}
                aria-label="Close"
              />
            </Dialog.Close>
          ) : (
            <></>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MyModal
