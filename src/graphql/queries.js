import gql from 'graphql-tag'



export const GET_ALL_EVENTS = gql`
query{
    findActByUser{
      id
      name
      description
      day
      location{
        address
      }
      account{
        username
      }
    }
  }
`
export const GET_EVENT_BY_ID = gql`
query($id: Int!){
    findActOne(id: $id){
      name
      description
      day
      id
      account{
        username
      }
      location{
        id
        address
      }
    }
  }
`

export const GET_ALL_LOCATIONS = gql`
query{
    locations{
        address
        id
    }
}
`


export const GET_EVENTS_BY_DATES = gql`
query($startDay: String!, $endDay: String!) {
  dates(dateIntervalInput: { startDay: $startDay, endDay: $endDay }) {
    name
    day
    id
    description
    location {
      address
    }
    account {
      username
    }
  }
}
`