const { queryApi } = require('sec-api');
queryApi.setApiKey(process.env.SEC_API);
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

exports.handler = async function () {
  const query = {
    query: { query_string: { query: 'formType:"10-Q"' } }, // get most recent 10-Q filings
    from: '0', // start with first filing. used for pagination.
    size: '10', // limit response to 10 filings
    sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
  };

  const filings = await queryApi.getFilings(query);
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: filings,
    }),
  };
};
