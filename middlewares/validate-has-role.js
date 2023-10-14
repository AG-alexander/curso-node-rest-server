const isAdminRol = (req = request, res = response, next) => {

    const { user } = req;

    if (!user) {
        return res.status(500).json({
            msg: 'noy hay usuario en la request'
        })
    }

    if (!user.state) {
        return res.status(500).json({
            msg: 'usuario no activo'
        })
    }

    if (user.role !== "ADMIN_ROLE") {
        return res.status(500).json({
            msg: 'usuario no posee los permisos sufucientes'
        })
    }

    next();
}

const hasAnyRoleOf = (...roles) => {
    return (req = request, res = response, next) => {
        const { user } = req;

        if (!user) {
            return res.status(500).json({
                msg: 'noy hay usuario en la request'
            })
        }

        if (!user.state) {
            return res.status(500).json({
                msg: 'usuario no activo'
            })
        }

        const hasRole = roles.includes(user.role);

        if (!hasRole) {
            return res.status(500).json({
                msg: 'usuario no posee los permisos sufucientes'
            })
        }

        next();
    }
}

module.exports = {
    isAdminRol,
    hasAnyRoleOf
}