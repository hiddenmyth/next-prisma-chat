import { Fragment, ReactNode } from 'react';

import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

export default function SidebarModalWrapper({
  children,
  isOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}) {
  return (
    <Fragment>
      <Modal
        classNames={{
          base: 'justify-start sm:m-0 p-0 h-dvh max-h-full',
          wrapper: 'sm:items-start sm:justify-start w-72 !overflow-x-hidden',
          body: 'p-0',
          closeButton: 'z-50',
        }}
        className="!overflow-x-hidden"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              x: -288,
              transition: {
                duration: 0.2,
                ease: 'easeOut',
              },
            },
          },
        }}
        radius="none"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="m-0">
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
