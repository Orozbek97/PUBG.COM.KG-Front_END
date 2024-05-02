import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Helmet} from "react-helmet";
import PhoneInput from "react-phone-input-2";
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Context} from "../../../index";
import UserService from "../../../services/UserService";
import Header from "../../header/Header";
import "./personal-page-style.css";

const PersonalInfoEdit = () => {
	const { store } = useContext(Context);

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [name, setName] = useState("");
	const [pubgNick, setPubgNick] = useState("");
	const [pubgId, setPubgId] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	
	useEffect(() => {
		if (store.user.name) {
			setName(store.user.name);
		}
		if (store.user.pubgNick) {
			setPubgNick(store.user.pubgNick);
		}
		if (store.user.pubgId) {
			setPubgId(store.user.pubgId);
		}
		if (store.user.phoneNumber) {
			setPhoneNumber(store.user.phoneNumber)
		}
	}, [store.user]);
	
	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handlePubgNickChange = (e) => {
		setPubgNick(e.target.value);
	};
	
	const handlePubgIdChange = (e) => {
		const value = e.target.value;
		const lastChar = value.slice(-1);
		if (!/\d/.test(lastChar)) {
			setPubgId(value.slice(0, -1));
		} else {
			setPubgId(value);
		}
	};
	const handlePhoneNumberChange = (value) => {
		setPhoneNumber(value);
	};
	const updateProfile = async () => {
		setIsLoading(true);
		try {
			const userData = {
				name,
				pubgNick,
				pubgId,
			};
			
			if (phoneNumber) {
				userData.phoneNumber = phoneNumber;
			}
			const updatedUser = await UserService.updatePlayerData(store.user.id, userData);
			setIsLoading(false);
			setShowToast(true);
			toast.success("Данные успешно сохранены!");
			setTimeout(() => {
				setShowToast(false);
				navigate("/me/personal-area");
			}, 1000);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};
	
	return (
			<>
				<Helmet>
					<title> Редактировать данные - PUBG.COM.KG</title>
				</Helmet>
				<Header />
				<Container>
					<div className="personal-info-edit-form">
						<div className="title"> Редактировать профиль</div>
						<div className="subtitle">
							Введите свои данные для редактирования профиля
						</div>
						<div className="loader-toast d-flex justify-content-center">
							
							{showToast &&  <Alert variant="success">Данные успешно сохранены!</Alert>}
						</div>
						<div className="input-container ic1">
							<input
									id="name"
									className="input"
									type="text"
									value={name}
									onChange={handleNameChange}
									placeholder=""
									required
							/>
							<div className="cut cut-short"> </div>
							<label
									htmlFor="name"
									className="placeholder"
							>
								Имя
							</label>
						</div>
						<div className="input-container ic2">
							<input
									id="pubgName"
									className="input"
									type="text"
									value={pubgNick}
									onChange={handlePubgNickChange}
									placeholder=""
									required
							/>
							<div className="cut cut-pubgName"></div>
							<label
									htmlFor="pubgName"
									className="placeholder"
							>
								Никнейм в PUBG
							</label>
						</div>
						<div className="input-container ic2">
							<input
									id="pubgId"
									className="input"
									type="tel"
									value={pubgId}
									onChange={handlePubgIdChange}
									placeholder=""
									required
							/>
							<div className="cut cut-id"></div>
							<label
									htmlFor="pubgId"
									className="placeholder"
							>
								ID в PUBG
							</label>
						</div>
						<div className="input-container ic2">
							<PhoneInput
									onlyCountries={["ru", "kg"]}
									countryCodeEditable={false}
									localization={{ ru: "RU", kg: "KG" }}
									country={"ru"}
									aftoFocus={true}
									value={store.user.phoneNumber ? store.user.phoneNumber.toString() : ''}
									onChange={handlePhoneNumberChange}
									placeholder=" "
							/>
							<div className="cut cut-pubgNumber ">
								Номер телефона
								<WhatsAppIcon
										color="success"
										sx={{ background: "none" }}
								/>
							</div>
						</div>
						<div className="btn-container d-flex gap-2">
							<button
									type="button"
									className="submit cancel"
									onClick={() => navigate("/me/personal-area")}
							>
								Отмена
							</button>
							<button
									className="submit"
									onClick={updateProfile}
									disabled={isLoading}
							>
								{isLoading ? (
										<ClipLoader color="#fff" size={20}/>
								) : (
										"Сохранить"
								)}
							</button>
						</div>
					</div>
				</Container>
			</>
	);
};

export default observer(PersonalInfoEdit);
