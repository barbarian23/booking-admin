import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Icon = (props) => {
    switch (props.name) {
        case 'shopping-cart':
            return <ShoppingCartIcon />;
        case 'layers':
            return <LayersIcon />;
        case 'store-front':
            return <StorefrontIcon />;
        case 'people':
            return <PeopleIcon />;
        case 'add-task':
            return <AddTaskIcon />;
        case 'manager-accounts':
            return <ManageAccountsIcon />;

        default:
            return null;
    }
};

export default Icon;