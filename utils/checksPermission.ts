import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser: any, resourceUserId: any) => {
    // Superadmins and Admins have full CRUD access to everything
    if (requestUser.role === 'superadmin' || requestUser.role === 'admin') return;

    // Otherwise, regular leaders can only modify resources they created
    if(requestUser.userId === resourceUserId.toString()) return;
    
    throw new UnauthenticatedError('Not authorized to access this route');
}

export default checkPermission;