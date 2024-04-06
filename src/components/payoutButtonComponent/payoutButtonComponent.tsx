import { Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useFixtureWithdrawPayout } from "../../hooks/stake";
import { useFixtureTransacting } from "../../hooks/view";

const PREFIX = 'PayoutButtonComponent';

const classes = {
    fulfillBtn: `${PREFIX}-fulfillBtn`
};

const StyledButton = styled(Button)((
    {
        theme
    }
) => ({
    [`&.${classes.fulfillBtn}`]: {
        maxHeight: "2em",
    }
}));

export interface PayoutButtonComponentProps {
    fixtureID: string,
    label: string,
    disabled: boolean
}

export const PayoutButtonComponent = (props: PayoutButtonComponentProps) => {

    const { withdrawPayout } = useFixtureWithdrawPayout(props.fixtureID);
    const handlePayoutAction = () => withdrawPayout(props.fixtureID);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    return (
        <StyledButton
            className={classes.fulfillBtn}
            color="primary"
            variant="contained"
            onClick={handlePayoutAction}
            disabled={isFixtureTransacting || props.disabled}
        >
            {isFixtureTransacting ? <CircularProgress size={26} /> : <span>{props.label}</span>}
        </StyledButton>
    );
}