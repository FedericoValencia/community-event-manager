import Typography from '@mui/material/Typography';
import Communities from "../communities/Communities";

export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h2" gutterBottom>
                    Welcome to community event manager
                </Typography>
                <Communities/>
            </header>
        </div>);
};