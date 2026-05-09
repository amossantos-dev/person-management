using AutoMapper;
using PersonManagement.Application.DTOs;
using PersonManagement.Domain.Entities;

namespace PersonManagement.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<PersonAddress, PersonAddressDto>().ReverseMap();
        CreateMap<Person, PersonResponseDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));
    }
}