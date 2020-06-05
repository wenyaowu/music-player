import axios from "axios";
const clientId = "b8edfb6e31936995ba3ee048b92e3e4b";
const search = async (searchTerm) => {
  // find all sounds of buskers licensed under 'creative commons share alike'

  let { data } = await axios.get(
    `https://api.soundcloud.com/tracks?client_id=${clientId}&q=${searchTerm}`
  );

  return data;
};

export default { search };
