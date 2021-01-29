import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core";
import style from "./WeatherStyle";
import gql from "graphql-tag";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import SmallTitle from "../../../components/typography/SmallTitle";
import {UPDATE_WEATHER_INFO} from "../../../core/reducers/weatherConfig";
import Select from "../../../components/select/Select";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/react-hooks";
import {useDispatch, useSelector} from "react-redux";

const Weather = ({classes}) => {
    const [city, setCity] = useState("");
    const [errorCity, setErrorName] = useState(null);
    const [country, setCountry] = useState("");
    const [errorCountry, setErrorType] = useState(null);
    const dispatch = useDispatch();

    const weather = useSelector((state) => state.weather);
    const updateWeatherInfo = (payload) => dispatch({type: UPDATE_WEATHER_INFO, payload});

    useEffect(() => {
        setCity(weather?.city ?? "");
        setCountry(weather?.country ?? "");
    }, [weather]);

    const handleCancel = () => {
        setCity(weather.city);
        setCountry(weather.country);
    };

    const {t} = useTranslation();

    const [updateWeatherLocation, {data, error, loading}] = useMutation(UPDATE_WEATHER_LOCATION);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (city.length < 2) {
            setErrorName("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorName("");
        }
        if (!country) {
            setErrorType("Veuillez selectionner un pays");
            validation = false;
        } else {
            setErrorType("");
        }

        if (validation) {
            const input = {
                city,
                country,
            };

            updateWeatherLocation({variables: {...input}});
        }
    };

    useEffect(() => {
        if (data?.updateWeatherLocation?._id) {
            notify(t("Weather edtité avec success"), {
                variant: "success",
            });
            updateWeatherInfo(data.updateWeatherLocation);
        }
    }, [data, history, t]);

    const options = [
        {
            value: "be",
            label: "Belgique",
        },
        {
            value: "fr",
            label: "France",
        },
    ];

    return (
        <div className={classes.root}>
            <Title bold>Edition des paramètres météo</Title>
            <Text>Editez vos information pour afficher quelques données météo</Text>
            <form className={classes.form} onSubmit={(e) => createUser(e)}>
                <div className={classes.input}>
                    <div className={classes.inputType}>
                        <SmallTitle color="label" className={classes.label}>
                            Pays
                        </SmallTitle>
                        <Select
                            placeholder="Pays d'habitation"
                            options={options}
                            error={!!errorCountry}
                            isClearable={false}
                            onChange={(e) => setCountry(e.value)}
                            isSearchable={false}
                            inputValue=""
                            value={options.find((e) => e.value === country)}
                        />
                    </div>
                </div>
                <div className={classes.input}>
                    <SmallTitle color="label" className={classes.label}>
                        Ville
                    </SmallTitle>
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ville de résidence"
                        type="text"
                        helperText={t(errorCity)}
                        error={!!errorCity}
                    />
                </div>
                <Error errorMessage={error} />
                <div className={classes.formFooter}>
                    <Button noMargin type="submit" loading={loading}>
                        Sauvegarder
                    </Button>
                    <Button noMargin color="transparent" onClick={() => handleCancel()}>
                        Annuler
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withStyles(style)(Weather);

const UPDATE_WEATHER_LOCATION = gql`
    mutation updateWeatherLocation($city: String!, $country: String!) {
        updateWeatherLocation(city: $city, country: $country) {
            _id
            city
            country
            visibility
            dt
            humidity
            temp
            feels_like
            temp_min
            temp_max
            pressure
            main
            description
            icon
            clouds
            wind
        }
    }
`;
