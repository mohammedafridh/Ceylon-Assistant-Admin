import { Modal, useMantineTheme} from '@mantine/core';
import './SuccessModal.css'

function ErrorModal({modalOpened,setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size = '45%'
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
    >

    <div className="successModal">
      <img src = 'https://i.pinimg.com/736x/d0/17/47/d01747c4285afa4e7a6e8656c9cd60cb--image.jpg' alt = '' />
      <h3>Error. Please check the details again !</h3>
    </div>

    </Modal>
  );
}

export default ErrorModal