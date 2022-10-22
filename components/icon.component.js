import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MessageIcon from '@mui/icons-material/Message';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MediationIcon from '@mui/icons-material/Mediation';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        case 'message':
            return <MessageIcon />;
        case 'access-alarms':
            return <AccessAlarmsIcon />;
        case 'local-atm':
            return <LocalAtmIcon />;
        case 'mediation':
            return <MediationIcon />;
        case 'account-tree':
            return <AccountTreeIcon />;
        case 'warehouse':
            return <WarehouseIcon />;
        case 'currency-exchange':
            return <CurrencyExchangeIcon />;
        case 'event-available':
            return <EventAvailableIcon />;
        case 'switch-account':
            return <SwitchAccountIcon />;
        case 'account-circle':
            return <AccountCircleIcon />;

        default:
            return null;
    }
};

export default Icon;