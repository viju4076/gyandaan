import React,{useState,useEffect} from 'react'
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER, LOGGED_IN_USER } from '../../actions/types';
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
const Index = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('/profile/userkiprofile')
            .then(data => data.json())
            .then(data => {
                console.log('above if statement', data);
                if (data.status == 200) {
                    setUser(data.user);
                    console.log("inside profile", data.user);
                    dispatch({
                        type: UPDATE_USER, payload: {
                            update_user: data.user
                        }
                    });
                    dispatch({
                        type: LOGGED_IN_USER, payload: {
                            user_id: data.user._id
                        }
                    });


                }
            })
    }, []);
    return (
      <>
      <Navbar/>
    <div>
<div class="container">
    <div class="row">
        <div class="col-lg-3 left">
        {user&& <Sidebar user={user}  />}
        </div>
        <div class="col-lg-9 right">
            <div class="box shadow-sm rounded bg-white mb-3">
                <div class="box-title border-bottom p-3">
                    <h6 class="m-0">Recent</h6>
                </div>
                <div class="box-body p-0">

                    <div class="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                        </div>
                        <div class="font-weight-bold mr-3">
                            <div class="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
                            <div class="small">Income tax sops on the cards, The bias in VC funding, and other top news for you</div>
                        </div>
                        <span class="ml-auto mb-auto">
                            <div class="btn-group">
                                <button type="button" class="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button"><i class="mdi mdi-delete"></i> Delete</button>
                                    <button class="dropdown-item" type="button"><i class="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div class="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    
                </div>
            </div>
            <div class="box shadow-sm rounded bg-white mb-3">
                <div class="box-title border-bottom p-3">
                    <h6 class="m-0">Earlier</h6>
                </div>
                <div class="box-body p-0">
                    <div class="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div class="dropdown-list-image mr-3 d-flex align-items-center bg-danger justify-content-center rounded-circle text-white">DRM</div>
                        <div class="font-weight-bold mr-3">
                            <div class="text-truncate">DAILY RUNDOWN: MONDAY</div>
                            <div class="small">Nunc purus metus, aliquam vitae venenatis sit amet, porta non est.</div>
                        </div>
                        <span class="ml-auto mb-auto">
                            <div class="btn-group">
                                <button type="button" class="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button"><i class="mdi mdi-delete"></i> Delete</button>
                                    <button class="dropdown-item" type="button"><i class="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div class="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    </div>
            </div>
        </div>
    </div>
</div>
    </div>
    </>
  )
}

export default Index