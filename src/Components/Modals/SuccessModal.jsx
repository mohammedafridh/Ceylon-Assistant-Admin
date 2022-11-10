import { Modal, useMantineTheme} from '@mantine/core';
import './SuccessModal.css'

function SuccessModal({modalOpened,setModalOpened}) {
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
      <img src = 'https://cdn5.vectorstock.com/i/thumb-large/14/99/green-tick-marker-checkmark-circle-icon-vector-22691499.jpg' alt = '' />
      <h3>Record Added Successfully !</h3>
    </div>

    </Modal>
  );
}

export default SuccessModal