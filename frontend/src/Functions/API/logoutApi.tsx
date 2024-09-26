import React from 'react';
import axios from 'axios';

const lotgoutApi = () => {
    return (
        axios
        .post(
          "http://localhost:3000/api/logout",
          {},
          {
            withCredentials: true,
          }
        )
    );
};

export default lotgoutApi;