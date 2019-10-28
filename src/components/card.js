import React from 'react';
import {
    Card,
    Flex,
    Box,
    Heading,
    Text,
  } from 'rebass';

const routeToColorName = {
    'Red': 'Red',
    'Blue': 'Blue',
    'Brn': 'Brown',
    'G': 'Green',
    'Org': 'Orange',
    'P': 'Purple',
    'Pink': 'Pink',
    'Y': 'Yellow',
};

const routeToColorHex = {
    'Red': '#c60c30',
    'Blue': '#00a1de',
    'Brn': '#62361b',
    'G': '#009b3a',
    'Org': '#f9461c',
    'P': '#522398',
    'Pink': '#e27ea6',
    'Y': '#f9e300',
};

function getTimeDiffInMin(start, end) {
    const s = new Date(`${start.substring(0, 4)}-${start.substring(4, 6)}-${start.substring(6, 8)}T${start.substring(9)}-05:00`);
    const e = new Date(`${end.substring(0, 4)}-${end.substring(4, 6)}-${end.substring(6, 8)}T${end.substring(9)}-05:00`);
    const diff = e - s;
    return diff / 60000;
}

export default ({eta}) => {
    const dest = eta.destNm;
    const runNum = eta.rn;
    const color = routeToColorName[eta.rt];
    const colorHex = routeToColorHex[eta.rt];
    
    const arrives = eta.arrT[0];
    const predicted = eta.prdt[0];

    const minsToArrival = getTimeDiffInMin(predicted, arrives);

    return (
        <Box width={1/4}>
            <Card p={2} m={1}>
                <Flex>
                    <Box p={1} backgroundColor={colorHex} color='white' sx={{
                        borderRadius: '100px'
                    }}>
                        <Text>{`${color} Line`}</Text>
                    </Box>
                    <Text p={1}>{`#${runNum}`} &#8594;</Text>
                </Flex>
                
                <Flex>
                    <Heading>{dest}</Heading>
                    <Box mx='auto'></Box>
                    <Heading>{minsToArrival} {(minsToArrival === 1) ? 'min' : 'mins'}</Heading>
                </Flex>
            </Card>
        </Box>
    );
}