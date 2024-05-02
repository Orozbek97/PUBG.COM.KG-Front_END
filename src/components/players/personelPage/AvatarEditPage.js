import {observer} from "mobx-react-lite";
import React, {useContext, useState} from "react";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import {Context} from "../../../index";
import UserService from "../../../services/UserService";
import Header from "../../header/Header";
import './personal-page-style.css'

const AvatarEdit = () => {
	const {store} = useContext(Context);
	
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	
	const handleImageClick = (imageSrc) => {
		setSelectedImage(imageSrc);
	};
	
	const updateAvatar = async () => {
		setIsLoading(true);
		try {
			const updatedUser = await UserService.updateProfileAvatar(store.user.id, {image: selectedImage});
			setIsLoading(false);
			setShowToast(true);
			toast.success("Аватар успешно сохранен!");
			setTimeout(() => {
				setShowToast(false);
				navigate("/me/personal-area");
			}, 1000);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
			toast.error("Ошибка при сохранении аватара.");
		}
	};
	
	return (
			<>
				<Helmet>
					<title> Поменять фото профиля... - PUBG.COM.KG</title>
				</Helmet>
				<Header/>
				<Container>
					<div className="row row-cols-lg-2 row-cols-1">
						<div className="col">
							<div className="preview-position">
								<div className="preview">
									<img src={selectedImage || store.user.image}
									     alt="player-avatar"
									     width={'70%'}
									     style={{borderRadius: '50%', margin: " 0 auto"}}/>
									<div className="btn-container image-edit d-flex gap-1 mb-3">
										<button className="submit cancel" onClick={() => navigate("/me/personal-area")}>
											Отмена
										</button>
										<button className="submit"
										        onClick={updateAvatar}
										        disabled={isLoading} >
											{isLoading ? (
													<ClipLoader color="#fff" size={20}/>
											) : (
													"Сохранить"
											)}
										</button>
									</div>
									{showToast && <Alert variant="success">Данные успешно сохранены!</Alert>}
								</div>
								<h2> Выберите себе аватар </h2>
								<div className="line"></div>
							</div>
						</div>
						<div className="col">
							<div className="avatar-position">
								<div className="row row-cols-lg-4 row-cols-md-3 row-cols-3">
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/twEc/A7LphoDHD" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/twEc/A7LphoDHD")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/twEc/A7LphoDHD"
													alt="avatar1"
													width={"100%"}
											/>
											<p> Аватар 1 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/nLsm/9BQqtWqUU" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/nLsm/9BQqtWqUU")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/nLsm/9BQqtWqUU"
													alt="avatar2"
													width={"100%"}
											/>
											<p> Аватар 2 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/K1CX/Y7XfwrpT9" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/K1CX/Y7XfwrpT9")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/K1CX/Y7XfwrpT9"
													alt="avata3"
													width={"100%"}
											/>
											<p> Аватар 3 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/KNau/NVzMcjPPH" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/KNau/NVzMcjPPH")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/KNau/NVzMcjPPH"
													alt="avatar4"
													width={"100%"}
											/>
											<p> Аватар 4 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/MkNd/76roGfFzn" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/MkNd/76roGfFzn")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/MkNd/76roGfFzn"
													alt="avatar5"
													width={"100%"}
											/>
											<p> Аватар 5 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Qg5Q/e9pUXmzeW" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/Qg5Q/e9pUXmzeW")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/Qg5Q/e9pUXmzeW"
													alt="avatar6"
													width={"100%"}
											/>
											<p> Аватар 6 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/rsrW/iKjZEvDWu" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/rsrW/iKjZEvDWu")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/rsrW/iKjZEvDWu"
													alt="avatar7"
													width={"100%"}
											/>
											<p> Аватар 7 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jd6u/PpDDvVqjC" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jd6u/PpDDvVqjC")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/Jd6u/PpDDvVqjC"
													alt="avatar8"
													width={"100%"}
											/>
											<p> Аватар 8 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/xkxg/ykxFFJN4V" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/xkxg/ykxFFJN4V")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/xkxg/ykxFFJN4V"
													alt="avatar9"
													width={"100%"}
											/>
											<p> Аватар 9 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/fFAE/b5PxPcghY" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/fFAE/b5PxPcghY")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/fFAE/b5PxPcghY"
													alt="avatar10"
													width={"100%"}
											/>
											<p> Аватар 10 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/KXVN/y9PFT8qht" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/KXVN/y9PFT8qht")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/KXVN/y9PFT8qht"
													alt="avatar11"
													width={"100%"}
											/>
											<p> Аватар 11 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/aNg3/ppSt5z14r" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/aNg3/ppSt5z14r")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/aNg3/ppSt5z14r"
													alt="avatar12"
													width={"100%"}
											/>
											<p> Аватар 12 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/HrY5/nn6prqscb" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/HrY5/nn6prqscb")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/HrY5/nn6prqscb"
													alt="avatar13"
													width={"100%"}
											/>
											<p> Аватар 13 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/2PV8/LkMmKxE2R" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/2PV8/LkMmKxE2R")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/2PV8/LkMmKxE2R"
													alt="avatar14"
													width={"100%"}
											/>
											<p> Аватар 14 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/bnP8/96Xk8LqVe" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/bnP8/96Xk8LqVe")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/bnP8/96Xk8LqVe"
													alt="avatar15"
													width={"100%"}
											/>
											<p> Аватар 15 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/iK5V/oVCRwWv4T" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/iK5V/oVCRwWv4T")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/iK5V/oVCRwWv4T"
													alt="avatar16"
													width={"100%"}
											/>
											<p> Аватар 16 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/VxbA/dhDZ4U6SL" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/VxbA/dhDZ4U6SL")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/VxbA/dhDZ4U6SL"
													alt="avatar17"
													width={"100%"}
											/>
											<p> Аватар 17 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/aKWo/2kEmqyeMz" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/aKWo/2kEmqyeMz")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/aKWo/2kEmqyeMz"
													alt="avatar18"
													width={"100%"}
											/>
											<p> Аватар 18 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/1r1o/twK7KGp6o" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/1r1o/twK7KGp6o")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/1r1o/twK7KGp6o"
													alt="avatar19"
													width={"100%"}
											/>
											<p> Аватар 19 </p>
										</div>
									</div>
									<div className="col my-2">
										<div
												className={`avatar-box ${selectedImage === "https://thumb.cloud.mail.ru/weblink/thumb/xw1/1bNF/PSL5S9Cc9" ? 'selected' : ''}`}
												onClick={() => handleImageClick("https://thumb.cloud.mail.ru/weblink/thumb/xw1/1bNF/PSL5S9Cc9")}>
											<img
													src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/1bNF/PSL5S9Cc9"
													alt="avatar20"
													width={"100%"}
											/>
											<p> Аватар 20 </p>
										</div>
									</div>
								
								</div>
							</div>
						</div>
					</div>
				
				</Container>
			</>
	)
}

export default observer(AvatarEdit)