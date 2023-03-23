import React from "react";
import {Grid, Typography} from "@mui/material";

interface PageWrapperProps {
    children: any;
    heading: string;
    subheading?: string;
}

export const PageWrapper = ({children, heading, subheading}: PageWrapperProps) => {
    return (
        <Grid
            container
            sx={{mt: 20}}
            textAlign={"center"}
            direction={"column"}
            alignItems={"center"}
        >
            <Typography variant={"h1"}>{heading}</Typography>
            <Typography variant={"h2"}>{subheading}</Typography>
            {children}
        </Grid>
    )
}