import { MouseEventHandler, useState } from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
    Autocomplete,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    Checkbox,
    Container,

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const PaTransferListPage = ({ email }: any) => {
    const navigate = useNavigate();
    const aggLists = [
        {
            id_agg: 0,
            label: "Aggregation 1",
            paList: [
                {
                    id_pa: 0,
                    label: "Comune di Roma"
                },
                {
                    id_pa: 1,
                    label: "Comune di Fiumicino"
                },
                {
                    id_pa: 2,
                    label: "Comune di Frosinone"
                },
                {
                    id_pa: 3,
                    label: "Comune di Viterbo"
                },
                {
                    id_pa: 4,
                    label: "Comune di Latina"
                }
            ]
        },
        {
            id_agg: 1,
            label: "Aggregation 2",
            paList: [
                {
                    id_pa: 5,
                    label: "Comune di Milano"
                },
                {
                    id_pa: 6,
                    label: "Comune di Monza"
                },
                {
                    id_pa: 7,
                    label: "Comune di Firenze"
                },
                {
                    id_pa: 8,
                    label: "Comune di Rieti"
                },
                {
                    id_pa: 9,
                    label: "Comune di Napoli"
                }
            ]
        },
        {
            id_agg: 2,
            label: "Aggregation 3",
            paList: [
                {
                    id_pa: 10,
                    label: "Comune di Bari"
                },
                {
                    id_pa: 11,
                    label: "Comune di Cosenza"
                },
                {
                    id_pa: 12,
                    label: "Comune di Catanzaro"
                },
                {
                    id_pa: 13,
                    label: "Comune di Trieste"
                },
                {
                    id_pa: 14,
                    label: "Comune di Potenza"
                }
            ]
        }
    ]

    const [isInput2Disabled, setIsInput2Disabled] = useState(true);
    const [input1Value, setInput1Value]: any = useState(aggLists[0]);
    const [input2Value, setInput2Value]: any = useState(null);
    const [areInputsEqual, setAreInputsEqual]: any = useState(false);
    const [checked, setChecked]: any = useState([]);
    const [renderedList, setRenderedList] = useState(aggLists)

    const handleChangeInput1 = (event: any, value: any) => {
        isInput2Disabled && setIsInput2Disabled(false)
        setChecked([]);
        setInput1Value(value)
        if (input1Value?.id_agg !== null && input2Value?.id_agg !== null && input2Value?.id_agg !== value.id_agg) {
            setAreInputsEqual(false)
        }
        else {
            setAreInputsEqual(true)
        }
    }
    const handleChangeInput2 = (event: any, value: any) => {
        if (input1Value?.id_agg !== null && input2Value?.id_agg !== null && input1Value.id_agg !== value.id_agg) {
            setInput2Value(value)
            setAreInputsEqual(false)
        }
        else {
            setAreInputsEqual(true)
        }
    }
    const addToChecked = (ind: number) => {
        if (!checked.includes(ind)) {
            setChecked([...checked, ind])
        }
        else {
            setChecked(checked.filter((item: any) => item !== ind))
        }
    }
    const handleTransfer = () => {
        setRenderedList(oldList => oldList.map((single_agg: any) => {
            if (single_agg.id_agg === input2Value.id_agg) {
                return {
                    ...single_agg,
                    paList: single_agg.paList.concat(oldList[input1Value.id_agg].paList.filter((single_pa: any, ind: number) => checked.includes(ind)))
                }
            }
            else if (single_agg.id_agg === input1Value.id_agg) {
                return {
                    ...single_agg,
                    paList: oldList[input1Value.id_agg].paList.filter((single_pa: any, ind: number) => !checked.includes(ind))
                }
            }
            else {
                return single_agg
            }
        }))
        setChecked([]);
    }
    return (
        <MainLayout email={email}>
            <Container><h1>Trasferimento di PA</h1></Container>
            <Container style={{ marginTop: 20 }}>
                <div className="agg-selection" style={{ display: 'flex', gap: 350 }}>
                    <Autocomplete
                        onChange={handleChangeInput1}
                        options={renderedList}
                        value={input1Value}
                        sx={{ width: 500 }}
                        renderInput={(params) => <TextField {...params} label="Aggregazione di partenza" />}
                    />
                    <Autocomplete
                        onChange={handleChangeInput2}
                        options={renderedList}
                        sx={{ width: 500 }}
                        disabled={isInput2Disabled}
                        renderInput={(params) => <TextField error={areInputsEqual} helperText={areInputsEqual ? "Scegli una lista di aggregazione diversa" : null} {...params} label="Aggregazione di destinazione" />}
                    />
                </div>
                <div className="transfer-list" style={{ display: 'flex', gap: 100, marginTop: 150 }}>
                    <List style={{ backgroundColor: 'white', width: 500 }}>
                        {renderedList[input1Value?.id_agg]?.paList.length < 1 ? <ListItem>La lista è vuota</ListItem>
                            : renderedList[input1Value?.id_agg]?.paList.map((pa: any, ind: number) => (
                                <ListItem key={pa.id_pa}>
                                    <ListItemIcon>
                                        <Checkbox
                                            onChange={() => addToChecked(ind)}
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': pa.id_pa }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={pa.id_pa} primary={pa.label} />
                                </ListItem>
                            ))

                        }
                    </List>
                    <div style={{ width: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {(isInput2Disabled || areInputsEqual || !input1Value || !input2Value) ?
                            <Button variant="contained" disabled>Trasferisci<SendIcon fontSize="small" style={{ marginLeft: 10 }} /></Button>
                            : <Button variant="contained" onClick={handleTransfer}>Trasferisci<SendIcon fontSize="small" style={{ marginLeft: 10 }} /></Button>}
                    </div>
                    <List style={{ backgroundColor: 'white', width: 500 }}>
                        {!areInputsEqual && renderedList[input2Value?.id_agg]?.paList.length < 1 ? <ListItem>La lista è vuota</ListItem>
                            : renderedList[input2Value?.id_agg]?.paList.map((pa: any) => (
                                <ListItem key={pa.id_pa}>
                                    <ListItemIcon>
                                        <Checkbox
                                            disabled
                                            checked={false}
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': pa.id_pa }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={pa.id_pa} primary={pa.label} />
                                </ListItem>
                            ))

                        }
                    </List>
                </div>
            </Container>
        </MainLayout >
    );
};
export default PaTransferListPage;


