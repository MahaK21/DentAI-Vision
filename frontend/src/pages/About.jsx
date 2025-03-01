/*
A webpage with a brief overview of our project and team.
*/
import "./About.css"
import Navbar from "../Navbar"
const TeamMember = ({name, role, program}) => (
	<div className="member">
		<h2>{name}</h2>
		<div className="details">
			<h4>{program}</h4>
			<h4>{role}</h4>
		</div>
	</div>
)

export default function About() {
	return (
	<div>
		<Navbar/>
		<div className="info">
			<h1>What is DentAI?</h1>
			<p>DentAI uses machine learning algorithms to detect cavities in X-Ray images. Our goal is to help patients feel confident in their dentist's diagnosis.
				Let's write more about it down here.</p>
		</div>
		<div className="teamInfo">
			<h1>Our Team</h1>
			<ul className="teamData">
				<li><TeamMember name="Maha Kesibi" role="Project Manager" program="Computing"></TeamMember></li>
				<li><TeamMember name="Kamran Jornacion" role="Design Team Member" program="Applied Math Engineering"></TeamMember></li>
				<li><TeamMember name="Kanika Poonia" role="Design Team Member" program="Computing"></TeamMember></li>
				<li><TeamMember name="Fouad Saffar" role="Design Team Member" program="Computer Engineering"></TeamMember></li>
				<li><TeamMember name="Leila Salem" role="Design Team Member" program="Computing"></TeamMember></li>
				<li><TeamMember name="Het Buddhev" role="Design Team Member" program="Computer Engineering"></TeamMember></li>
				<li><TeamMember name="Elliott Vince" role="Design Team Member" program="Computing"></TeamMember></li>

			</ul>
		</div>
	</div>
	)
}