import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../redux/hook';
import { CostDTO } from '../../api/paperChannel';
import { setSelectedCost } from '../../redux/costs/reducers';
import { Cost } from '../../model';
import { usePaperChannel } from '../../hooks/usePaperChannel';
import { useHasPermissions } from '../../hooks/useHasPermissions';
import { Permission } from '../../model/user-permission';
import { DropdownMenu } from './DropdownMenu';

export function ButtonsActionCostTable(props: { value: CostDTO }) {
  const dispatch = useAppDispatch();
  const { deleteCost } = usePaperChannel();
  const canWrite = useHasPermissions([Permission.TENDER_WRITE]);

  const handleClickEdit = () => {
    const value = {
      uid: props.value.uid,
      price: props.value.price,
      priceAdditional: props.value.priceAdditional,
      type: props.value?.cap ? 'NATIONAL' : 'INTERNATIONAL',
      cap: props.value.cap,
      zone: props.value.zone,
      internationalProductType: props.value?.zone ? props.value.productType : undefined,
      nationalProductType: props.value?.cap ? props.value.productType : undefined,
    } as Cost;

    dispatch(setSelectedCost(value));
  };

  const handleDeleteCost = async () => {
    await deleteCost(
      props.value.tenderCode as string,
      props.value.driverCode as string,
      props.value.uid as string
    );
  };

  if (!canWrite) {
    return null;
  }

  return (
    <>
      <DropdownMenu id={'menu-button-cost'}>
        <MenuList>
          <MenuItem onClick={handleClickEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Modifica</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteCost}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Elimina</ListItemText>
          </MenuItem>
        </MenuList>
      </DropdownMenu>
    </>
  );
}
