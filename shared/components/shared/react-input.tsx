import { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

const [value, setValue] = useState();

<AddressSuggestions token="API_KEY" value={value} onChange={setValue} />;
 