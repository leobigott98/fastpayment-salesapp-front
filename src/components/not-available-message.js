import {Card, Typography, CardContent} from '@mui/material';
import { Scrollbar } from './scrollbar';

const NotAvailable = ()=>{
    return(
        <Card>
            <CardContent>
            <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                >
                    No disponible
                </Typography>
                <Typography color="text.secondary">
                    Esta sección está pendiente por ser implementada.
                </Typography>

            </CardContent>
        </Card>

    )
}

export default NotAvailable;
