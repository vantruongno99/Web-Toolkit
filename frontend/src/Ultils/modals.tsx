import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

const DeleteModal = ( { title , func }: { title: string, func: () => void}) => {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete your ${title}`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive data can not be restored
        </Text>
      ),
      labels: { confirm: `Delete ${title}`, cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: func,
    });

  return <Button onClick={openDeleteModal} color="red">Delete</Button>;
}

export  { DeleteModal }