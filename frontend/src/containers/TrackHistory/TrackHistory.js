import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const TrackHistory = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const tracksHistory = useSelector(state => state.music.tracksHistory);

    return (
        <div>

        </div>
    );
};

export default TrackHistory;