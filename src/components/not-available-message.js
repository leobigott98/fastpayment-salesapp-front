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
                    Realice una búsqueda
                </Typography>
                <Typography color="text.secondary">
                    Busque un serial o número de terminal
                </Typography>

            </CardContent>
        </Card>

    )
}

export default NotAvailable;
