import React from "react";
import {Helmet} from "react-helmet";
import {useTheme} from "@material-ui/core";
import {useSelector} from "react-redux";

const Style = () => {
    const layout = useSelector((state) => state.darkMode);
    const theme = useTheme();

    return (
        <Helmet>
            {layout?.isDarkMode && (
                <style>
                    {`
                        .MuiCheckbox-colorPrimary.Mui-checked {
                            color: ${theme.palette.link.main} !important;
                        }
                        ul, li {
                            color: ${theme.palette.text.primary};
                        }
                    `}
                </style>
            )}
            <style>
                {`
                    .react-select__option.react-select__option--is-focused {
                        background: ${theme.palette.hover.select} !important;
                    }
                    .MuiOutlinedInput-input:-webkit-autofill {
                        -webkit-box-shadow: 0 0 0 100px ${theme.palette.background.default} inset;
                        -webkit-text-fill-color: #fff;
                    }
                `}
            </style>
        </Helmet>
    );
};

export default Style;
