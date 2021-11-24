using Common;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService
{
    public interface IUsuarioService
    {
        Task<DataCollection<UsuarioDto>> getListarUsuario(int page, int pages, string request);

        Task<UsuarioDto> getObtenerUsuario(string id);
    }
}
