import React from 'react';
import {
    Flex,
    Heading,
    Card,
    Box,
    Text,
} from 'rebass';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentStation, updateSearchQuery } from '../redux/actions';
import { getStations, getSearch } from '../redux/selectors';

const onlyUniqueIndex = (s, index, arr) => 
    (arr.findIndex((elem) => (elem.name === s.name)) === index);

const routes = [
    'red',
    'blue',
    'brn',
    'g',
    'o',
    'p',
    'pnk',
    'y',
];

const routesToColorHex = {
    'red': '#c60c30',
    'blue': '#00a1de',
    'brn': '#62361b',
    'g': '#009b3a',
    'o': '#f9461c',
    'p': '#522398',
    'pnk': '#e27ea6',
    'y': '#f9e300',
};

export default () => {
    const stations = useSelector(getStations);
    const query = useSelector(getSearch);
    const dispatch = useDispatch();

    if (query === '') return null;

    // With stations, extract the top search results
    const searchIdx = stations.map(s => ({name: s.station_name, id: s.map_id, meta: s}))
        // .filter(onlyUniqueIndex); // Filter out duplicate station names
    const results = searchIdx.filter(s => (s.name.toLowerCase().indexOf(query) !== -1))
        .sort((a, b) => (a.name.toLowerCase().indexOf(query) - b.name.toLowerCase().indexOf(query))) // First things in string ranked higher
        .slice(0, 10); // Get top 10 results

    console.log(results);

    function handleClick(result) {
        dispatch(updateCurrentStation(result.name, result.id));
        dispatch(updateSearchQuery('')); // Reset search query
    }

    return (
        <Flex 
            alignItems='center'
            justifyContent='center'
            backgroundColor='white'
            p={3}
            flexDirection='column'
            sx={{
                position: 'absolute',
                width: '100vw',
            }
        }>
            <Heading>Search Results</Heading>
            <Flex flexDirection='column' alignItems='center'>
                {results.map(result => (
                    <Box p={1} width={400} sx={{
                        cursor: 'pointer',
                        ':hover': {
                            backgroundColor: 'black',
                        }
                    }}>
                        <Card onClick={() => handleClick(result)}>
                            <Flex alignItems='center'>
                                <Heading>{result.name} Station</Heading>
                                <Box mx='auto'></Box>
                                {routes.map(color => {
                                    if (result.meta[color]) return (
                                        <Box 
                                            mx={1} 
                                            width={20} 
                                            height={20} 
                                            backgroundColor={routesToColorHex[color]}
                                            sx={{
                                                borderRadius: '20px',
                                            }}
                                        />
                                    );
                                    return null;
                                })}
                            </Flex>
                            <Text color='darkgray'>{result.meta.stop_name}</Text>
                        </Card>
                    </Box>
                ))}
            </Flex>
        </Flex>
    );
}