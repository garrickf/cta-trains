import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../redux/selectors'
import { updateSearchQuery } from '../redux/actions';
import {
    Box,
    Flex,
    Button,
    Text,
  } from 'rebass';
import { Input } from '@rebass/forms'


export default () => {
    const dispatch = useDispatch();
    const query = useSelector(getSearch);

    function handleChange(e) {
        dispatch(updateSearchQuery(e.target.value));
    }

    return (
        <Flex
            px={2}
            color='white'
            bg='black'
            alignItems='center'
        >
            <Text p={2} fontWeight='bold'>🚂 CTA TrainTracker</Text>
            <Box mx='auto' />
            <Box p={2}>
                <Input
                    id='query'
                    name='query'
                    placeholder='e.g., LaSalle Station'
                    value={query}
                    onChange={handleChange}
                />
            </Box>
            <Button variant='primary'>Search</Button>
        
        </Flex>
    );
}
