import { useEffect, useState } from "react";
import {
  Modal,
  MultiSelect,
  NativeSelect,
  useMantineTheme,
} from "@mantine/core";
// import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import "../../Components/Pages/Users/UsersContents/Admin/Admin.css";
import { db, storage } from "../../Firebase";
import { query, doc, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useUserAuth } from "../../Context/Context";
import './UpdateGuideModal.css'
import loadingGif from '../../assets/loading-gif.gif'
import { toast } from "react-hot-toast";

function UpdateGuideModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const [fName, setFName] = useState(data.firstName);
  const [lName, setLName] = useState(data.lastName);
  const [contactNumber, setContactNumber] = useState(data.contactNumber);
  const [address, setAddress] = useState(data.address);
  const [guideRate, setGuideRate] = useState(data.guideRate);
  const [model, setModel] = useState(data.model);
  const [maxPassengers, setMaxPassengers] = useState(data.maxPassengers);
  const [perKm, setPerKm] = useState(data.perKmRate);
  const [profile, setProfile] = useState("");
  const [imgError, setImgError] = useState(false);
  const [url, setUrl] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [languages, setLanguages] = useState(data.languages);
  const [district, setDistrict] = useState(data.district);
  const [type, setType] = useState(data);
  const [vehicleType, setVehicleType] = useState(data.vehicleType);
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    setFName(data.firstName);
    setLName(data.lastName);
    setContactNumber(data.contactNumber);
    setAddress(data.address);
    setGuideRate(data.guideRate);
    setMaxPassengers(data.maxPassengers);
    setPerKm(data.perKmRate);
    setModel(data.model);
    setLanguages(data.languages);
    setVehicleType(data.vehicleType);
    setType(data.guideType);
    setDistrict(data.district);
    console.log({ data });
  }, [data]);

  const setImage = (e, imageFolder, setUrl) => {
    const image = e.target.files[0];
    const storageImageRef = ref(
      storage,
      `${imageFolder}/${image?.name + v4()}`
    );
    if (image === null || image === undefined || image === "") {
      console.log("No file selected");
      setImgError(true);
      return;
    }
    uploadBytes(storageImageRef, image).then(() => {
      setImgError(false);
      getDownloadURL(storageImageRef)
        .then((url) => {
          setUrl(url);
          console.log({ profile: url });
        })
        .catch((error) => {
          console.log({ error });
        });
    });
  };
  const languageData = [
    "Sinhala",
    "English",
    "Hindi",
    "Malayalam",
    "Urdu",
    "French",
    "Arabic",
    "Spanish",
    "Russian",
    "Chinese",
    "Japanese",
    "Italian",
    "Korean",
  ];
  const typeData = ["National", "Site"];
  const districtData = [
    "Hambanthota",
    "Matara",
    "Galle",
    "Badulla",
    "Monaragala",
    "Trincomalee",
    "Batticaloa",
    "Ampara",
    "Kegalle",
    "Rathnapura",
    "Matale",
    "Kandy",
    "Nuwara-Eliya",
    "Anuradhapura",
    "Polonnaruwa",
    "Gampaha",
    "Colombo",
    "Kalutara",
    "Puttalam",
    "Kurunegala",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullativu",
    "Vavuniya",
  ];


  const carType = [ 'Car', 'Van', 'Mini Jeep'];

  const updateDetails = async (data) => {
    console.log("hello");
    setLoading(true)
    setDoc(
      doc(db, "Guides", data.id),
      {
        firstName: fName,
        lastName: lName,
        contactNumber: contactNumber,
        address: address,
        district: district,
        guideType: type,
        languages: languages,
        guideRate: guideRate,
        vehicleType: vehicleType,
        model: model,
        maxPassengers: maxPassengers,
        perKmRate: perKm,
        image: profile ? profile : data.image,
      },
      { merge: true }
    ).then(() => {
      setLoading(false)
      toast.success("Details Updated Successfully");
      setModalOpened(false);
    });
    // await updateDoc(item, {
    //   firstName:fName,
    //   lastName:lName,
    //   contactNumber: contactNumber,
    //   address: address,
    //   district: district,
    //   guideType : type,
    //   languages: languages,
    //   guideRate:guideRate,
    //   vehicleType:vehicleType,
    //   model: model,
    //   maxPassengers:maxPassengers,
    //   perKmRate: perKm,
    //   image:profile

    // }).then(()=>{
    //   alert('Details Updated Successfully')
    //     setModalOpened(false)
    // })
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size="60%"
      opened={modalOpened}
      onClose={() => {
        setModalOpened(false);
        //  setQuestion('');
        //  setAnswer('')
      }}
    >
      <div className="addThingsForm">
        <h3>Add Guide</h3>

        {imgError ? (
          <p style={{ color: "red", fontWeight: "bold" }}>
            * Please select a valid image!
          </p>
        ) : (
          ""
        )}

        <div>
          <input
            type="text"
            className="userInputModal"
            onChange={(e) => setFName(e.target.value)}
            placeholder="First Name"
            value={fName}
            required
          />
          <input
            type="text"
            className="userInputModal"
            onChange={(e) => setLName(e.target.value)}
            placeholder="Last Name"
            value={lName}
            required
          />
        </div>

        <div>
          <input
            type="number"
            className="userInputModal"
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Contact Number"
            value={contactNumber}
            required
          />

          <MultiSelect
            data={languageData}
            value={languages}
            onChange={setLanguages}
            style = {{minWidth:390}}
          />

        </div>

        <div>
          <input
            type="text"
            className="userInputModal"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            value={address}
            required
          />
          <NativeSelect
            className="typeDrop"
            data={districtData}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

        </div>

        <div>
          <NativeSelect
            className="guideDrop"
            onChange={(e) => setType(e.target.value)}
            data={typeData}
            value={type}
          />

          <input
            type="number"
            className="userInputModal"
            onChange={(e) => setGuideRate(e.target.value)}
            placeholder="Guide Rate Per Day"
            value={guideRate}
            required
          />

          <div className="perKm">
            <input
              type="number"
              className="userInputModal"
              onChange={(e) => setPerKm(e.target.value)}
              placeholder="Per Km Rate"
              value={perKm}
              required
            />
            <span>*Per Km Rate for own vehicle</span>
          </div>
        </div>

        <div>

          <NativeSelect
            className="typeDrop"
            // label="Vehicle Type"
            onChange={(e) => setVehicleType(e.target.value)}
            data={carType}
            value={vehicleType}
          />

          <input
            type="text"
            className="userInputModal"
            onChange={(e) => setModel(e.target.value)}
            placeholder="Vehicle Model"
            value={model}
          />
          <input
            type="number"
            className="userInputModal"
            onChange={(e) => setMaxPassengers(e.target.value)}
            placeholder="Maximum Passengers"
            value={maxPassengers}
            required
          />

        </div>
        <div className="authProfile">
          <span>Profile Image</span>
          <img src={profile ? profile : data.image} width={200} height={200} alt="profile" />
          <input
            type="file"
            name="coverImg"
            placeholder="Update Image"
            onChange={(e) => setImage(e, "Guide_Profile", setProfile)}
            required
          />
        </div>
        {loading?
        <button type = 'submit' className="button infoButton">
          <img className='loadingIcon' src={loadingGif} />
        </button>:

        <button
          onClick={() => updateDetails(data)}
          className="button infoButton"
        >
          Update Details
        </button>}
      </div>
    </Modal>
  );
}

export default UpdateGuideModal;
