import React from 'react'

function Intro({ user }) {
    console.log('props', user);
    return (
        <div>
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        <div class="card p-3 py-4">
                            <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" /> </div>
                            <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">{user[0].isTeacher ? "Teacher" : "Student"}</span>
                                <h5 class="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                                <div class="px-4 mt-1">
                                    <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                </div>
                                <ul class="social-list">
                                    <li><i class="fa fa-facebook"></i></li>
                                    <li><i class="fa fa-dribbble"></i></li>
                                    <li><i class="fa fa-instagram"></i></li>
                                    <li><i class="fa fa-linkedin"></i></li>
                                    <li><i class="fa fa-google"></i></li>
                                </ul>
                                <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro
