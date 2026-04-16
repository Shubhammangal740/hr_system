import Modal from '../ui/Modal';
import LeaveForm from './LeaveForm';

const LeaveEditModal = ({ isOpen, onClose, leave, onSubmit, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Leave Request">
      <LeaveForm 
        onSubmit={(data) => onSubmit(leave._id, data)}
        initialData={leave}
        loading={loading}
      />
    </Modal>
  );
};

export default LeaveEditModal;
