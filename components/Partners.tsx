"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const partners = [
  {
    src: "Unitrust-Insurance-Company-Limiteds-604x340.jpg",
    alt: "Firm-T Global",
  },
  {
    src: "Unitrust-Insurance-Company-Limiteds-604x340.jpg",
    alt: "Unitrust Insurance",
  },
  {
    src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPERUQEBMVFhUSFRUQGBcVGRYVFhoZFRcaFhcWFxgYHSggGBolHRgXITEiJSkrLi4vFyEzODMtNygtLjIBCgoKDg0OGxAQGi0eHyUtLS0tLS0tKy0uLS0tKy0tLS0tLS0tLS0tLi0rLS0tKy0rLS0tLS0tKy0tLS0tLS0tLf/AABEIAIEBhgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcEBQgDAgH/xABNEAABAwIDAwYHDAcHBAMAAAABAAIDBBEFEiEGEzEHIkFRYXEUMjNygZGxFiNCUlRic4KSwdHSFRckU7Kz4UR0g5OhovA1Y8LDJTRD/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwUEBv/EAC8RAQACAgAEBAUBCQAAAAAAAAABAgMRBCExQRITIlEFFFJxkWEVIzIzQlOh0fD/2gAMAwEAAhEDEQA/ALxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERfhdZB+osCbGIGcZAfN53sWOdo4Ot32SuFuKw1nU2j8jbotP7o4PnfZKe6SDrd9lT5vB9cfkbhFpvdLB1u+yV+e6an63fZKfN4frj8puG6Rayjx2GV4Y0nMeAIIv6Vs11pkreN1naiIi2CIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICItFtDipj96jPOPEj4I/ErjnzVw0m9h64rjjYiWM5z/wDaO/t7FGqytklN5HE9nAepY5X3BTvkNmNLj2D2noX5rPxeXiLa7e0I8yvkrbR7Ozu45W95/AFeh2Zm+NH63fgsxwWef6JTm0hK+St37mJvjR+t34J7l5vjR+t35VuOCz/RLOpaIlfJKz8UwmSmAL8pDja7STrxsbgdq1xK5Wx2pPhtGpZnkzcGP7RF54+9WIq5wU/tEXnj71YoXt/C/wCXb7tY+j9RananHWYdTPqpGOe1haMrLZjmcGi2YgdKgv66aX5LU+uH869aKzPR00tBFW+H8sFJLLHE6CeMSPbHndu8rcxsC6zibXIVkBSYmOoIiwMZxmCij31TI2NnC7uJPU0DVx7AFBnoquxDlmp2kiCmlkA4OeWxA9oHONu8BYlPy1C/vlEQPmSgn1FgW/Lt7LpbiKIbOco1BXOEbXmKR2gjmAYSeprgS1x7AbrY7YbTMwuAVEkb3gvbFlZlvd1zfnEC2izqd6RvkVX/AK6aX5LU+uH86frppfktT64fzrXl29l1K0EVX/rppfktT64fzqVbFbZRYs2V0UUke5LWneZNcwJFspPUpNJjqaSZFXuN8rFPSVEtM6nnc6F5jLm7vKSADcXeD0rB/XTS/Jan1w/nVilp7GpWgirBvLTS31pam3+Cf/YpRs3t5Q4g7dwyZZD/APnKMjz5vQ/6pKk0tHY0k6IontrtzFhLomSxSyb4PcN3k0yEA3zOHWpEb5QiWIqv/XTS/Jan1w/nW72Q5R6fE5zTMilifkMjd5ks7LbMBlcdQDfuB6lZpaF1KaoiLKCKs6vlkpo3vYaaoO7e+MkbqxLHFpIu/horLa64v16qzWY6mn6iIoCIiAiIgIiICIiAiIg8aucRsc88Ggn1KBSylzi52pcST6VKdqpbQhvxnAerX7go3h1NvpWx9BNz3DUrwPil7ZM1cUf9MpLYYLg2+98k0Z0Dpd+AUpjjbG2zQGtHVoF+SSMibckNa0W7OwLCbisUrXBrtcrtDoeB4X4r0MGLFw1fDuPF/mVe/wClIP3rPWFkxSB4DmkEHUEcCq5B0HcFJ6TGWU8MLXBxLmZtLdZHSVw4X4j5kz5kRWITaRItWzHIt1vnEtBJaAfGJHGwHFfNBj8MzxG0uDjwDha9tdCvQ+Yx7iPFHPobhh7a+RZ9IP4XKHEqYbbH3ln0g/hcoYSvF+IR+/n7Q45OrNwQ/tMXnhWSq0wQ/tMPnj71Za+34Z/BP3axdGux7Boq6B1PUAmN5aSGuLTzSHDUajUKq+UfY7DcMpN5EyTfSuEUQdLIRfi55BOoa0H0kdauVc58p+0Xh9c4sN4qe8Edumx57h5zhbuaF6+Pcy7QibmXGoNjdt+i9rkX67EetdE8l+0Xh9CwvN5YDuJOsloBa/6zSDfrv1KN1+wGXARCG3qYx4abcTLa74wT8y7B3BQnkr2i8Crmh5tFVWgf1BxPvTuyziR9fsW7euOS9XRK5s5R8Zkq8QnLyckL3QRt6GtZobDrc4Ek9OnUF0kqc5SuTuofUPraJu9bMc8kYID2vsAXNBPOabXsNQb8b6YxTETzSG32D5OKJ1LFU1Ld/JMxsurnCNocAQ1rWkA26ze/ZwW+r+TTDJm5RTiM9DonOYR22BsfSCqSoMexDDBkjlnp23vu5GkNv2MlbZvoAW7peVrEhrngkHzo/vY5q3NL73ErqW9g5Gn+FZZJw6kFnZgLTO18mR4re149AHRY20GysFdTMpJTII4y1zcrudzAQLueCToenVQXAuWRrnBlbBuwdN5ES5o7XMOoHaCe5WpBK17Q9hDmuAcCNQQRcEHpC52m3dJ2gH6nsP8Aj1P22fkVHYiwRyStbwjklYL8bMeWi/oC60XJuN+WqPpp/wCY5dMUzPVYXZByQ0DmtcX1FyAfHZ0jzFJdktkKfCxIKd0h3xa528cHatBAtYC3Fbuj8mzzW+wLDxvHaaha19VK2Nr3ZGl19XWJtoD0ArlNrTyRztt9/wBTrPp3ewKxtm+S2hqaSCokfOHSxRyuDXtAu5oJtdnBVntjVsnr6qaJwcySVzmuHAggai6uLZPbnDoKGmhlqmNfHBExzbP0cGgEaNXa+4rGl7MefkcoSCGS1LT0HNG71gs1VT7VYBLhlUad7rluWWORt23aScrx0tcC09OhCvKflJwtjS7wppt0NbI4+gBqpbb7aUYnWGdrS1jWtgjadXkAk3IHwi5x0F+jpUxzbfMhePJ3jrsQoIp5DeQZopDwu+M5S63aLH0r12n2OpMTcx1U15MQc1uV7maOsTfKdeAWLyZ4G+hw+OKUWkeXTvafgukN8p7QLA9oK32L4iylgkqJTZkTHSO7mi9h2nh6VymdW5IoflPwShw+aOmo2v3mXeyl0j32adGNAceJs437B1qK4ZXSUk8VRHcPic2VvRcdXc5pI7nLPp4psYrwHX3lXLdxGuRvSR2MYLDuCnnLNsuyGKCrgbZkTWUbwOho0hce4836wXfetVlVr4RiLKqCOoiN2SsEg9I4HtHD0LMVSch20F2yYfIdW3niv8Un3xg7nWd9c9SttfPavhnTMuT8X8vP9NP/ADHLq2LxR3BcpYv5ef6af+Y5dWxeKO4exdMvZqz7REXJkREQEREBERAREQEREEe2w8WPzj7FgbKeXP0bv4mrc7TwZ4CRxYQ/0cD/AKG/oUe2eqN3UNvwdeP18P8AUBeFxEeDjq2npyZnq2u1x8n3u9gUaJW62qpi2USdDx/uH9PvWhJXxcdueItuC0v0lelXVB7Y22tu2ZO/W91juK83OXGu4iYju5TZIqPCzU0bcrgHMkeRfhYnUHq6PUvLZnB3SPbUFwDWPNrakltx6B7VoRUvAyh7gOoOIGvHQGyysAgfNOyNpcGgh7rEgWbqb269B6V6GK1LXp6efKOv4TxRMxySbbjyLPpB/C5QolSnbmquY4h0XkPp0b/5KKEpx0xOadM5Z9TPwEXqYR88H1AlWYoLsRSZ5nSnhG231nf09oU5Xo/D6TXHv3l1wx6UR5T9ovAKF+R1pp7wRdYLhznjzW3PfZc+4ZVeDyxzBrXbpzZA19y0lurc2tzrY+hTHlPrKivrnlsM5hp7wR2ikINvKSDm9LtO5g61YfJzsXDBQsNVTxvmm9+dvY2uc3N4rOcDazbXHXderExSrv0hB/1w1/7um+y/86gFXIJHvflDc7nPysuGtzG9m3NwOpdP+5qi+SU3+TF+VQ3lT2NikojLRwMZJTu3mWGMNL2HR7bMHOIFnDze1K3rvoRLfcnO0P6QoY5HG8sfvMvntA531hZ3pWTjm2VFQzMp6iYNfJ0cQwdDpCPEaeAJ9gJVUck1XUUddupIZ2w1Q3TiY5AGvGsbySNBxbf5w6lm7Z8ldS2R9RROM7XkvcyR3vwJ42e42kHeQRpxUmlfFqU0uUZZGg81zTqODgR1jrWtxDZiiqL76lgeT0mNub7QFx61z1TYliWGXYx9TTgfBcHBg7mSAs9QXvLtjilWDGKmeQHQtiaGnX6FoKeVPaV08tucMgpK+anpXExsy6E5sriLuZm4mx69dVdPJG5xwmnzX03jW3+KJHBtuy1rdirLZXkwq6t4dUtNPDe5L9JXDpDWcW315zrW6ir3oaNkEbIYmhrI2hjWjgGtFgFclo1ol7rkzG/LVH00/wDMcus1yxjOFVBlqLU85vNMRaKQg3kcRbm6ph7lXUNH5Nnmt9gUX5Rtk5MVhiijkZGY5d6S8FwIyObYW71KKQe9s81vsXsuW9TuGXKeN4caSolpnODjC8xlw0BIANwD3qbYPyUVFVBFUNqYmiaNsoBa8kBwvY2PatJt3h07sSq3NgmcDM4gtjkcCLDUECxV7bFMLcPpGuBBFPECCCCDkGhB1BXa95iImGplz9tdsvNhcwhms4PbmZI0ENd8YC+oIJ1HaFPORemw+W7nR3rYbuvIcwy30khbwba9jpcHpsQrE2x2bjxOmdTyaHx438Sx44OHZqQR0glc/Q0Ffh9VmjhmbNTvIDmxyPYSOOoFnscPWD0FIt4667nV06qi5cdofJ4cw8cs81uoH3ph9IzfVb1qe4PtM2ehNY6KRhYxxkiLH7wOaLlrW2u6/QQNbhUHVUVbiNWXugmElVLxdHIGszmwBJFg1jbDuasY689z2SHxsttHJhszp4WRue5m7BkBOUE3dlsRqbD1LfYxyn1dXBJTzRU5ZK0sdZrwdeBBz6EGxHcrkw/ZGihiZF4NA7I1rMz4o3OdYWzOJFySsj3NUXySm/yYvyqzkrM70bc0YLib6Ooiqo9XQvD7fGHBzPrNJHpXUeH1jKiJk0RDmStbI0jpDhcKnOV7ZHczRVNJAd3K3dvZDGbNe3UOysGgc02v1t7Vv+RXEphDJQzxyt3R3sRkY9oLHnnMBcPgu1t1P7Fb6tXxLKnMW8vP9NP/ADHLq2LxR3BcvYphVQZ5v2eexmmPkpCCDI7XxdQtl+mcZ/eV/wBmb8q1eviJjbpJFzb+msZ/eV/qm/BbLZvF8WdW0zZZK0sdUQh4eJcuUvGbNcWta97rE4p9006AREXJBERAREQEREBERB8vaCCDqDoVAcWoXU8hbrbiw9Y7+sKwFiYlQMqGZHjtBHEHrC+LjOF86vLrHRJjbVYbWR1sRhl8cDXrNuD29q0GKYTLTkkjMzoeOHp+KvPEcPlpXXdewPNe3QdmvwT2LY0O1T2C0rc46xo78D/ovNtamT0Z/TaO/wDtiZieUo6XLyc5S92IYfLq+MNPawg+ti/BUYYzUNaT5j3fxBZjhK/3Kuc0/VGKDD5ah2WJpPW46NHefu4qY08UOGQFzjme7j8Z56GtHQ0f1WDV7XBoy08draAusAO5rVGKurfM4vkcXOPSfYB0BdYviwR6PVb37Qm606c5KyqdM90j/Gcbn7gOwLzp4XSvEcYu5xsB/wA4BZGHYbLUutE246XHRo7z9w1U8wLBGUrdOc8jnPPsA6As4OGvmtuenuxWk3nb3wbDm00QjGp4uPW48T/zqWegRe5WsVjUPriNcmJWYlBAQJpo4y7gHvawnuzHVZLHAi4NwdQRqCoBsHTwVBrn1jY5KrwuaOXfBrntiabQts7xY8nC2nFSbaPOzD5/AgA9tO/dBnAWZzcmXs4W7FvSs8YrBvNzvot5e2TOzPfqy3vdZirGqoqA7OGZrY7CkEwls3eb4Nvnz8d7vO291O9mHyOo6d0994YYy/NxzFovftSYGZFVxvaXtexzW3BcHAgZeNyDYWX2yVrmh4ILSMwIIII43B6lSeDySUFLPVi5pquStpKho13cu8kZBMB1HRju9qtTYpv/AMbSAj+ywi3+GEmuhlnGqU/2iC30kf4rMc9jWl5LQ0DMXXAFuNyeFlDWYLTfpkx+Dw5PAGuy7tmW+/Iva1r2W32+FsKrv7pUfynINtTYhDKcsUsbyNbMe1xt12BWSXAanvVS7P0jpq2gZLFBSOp4W1Mb47l9Wwxhrmhwa0DLoXNNzqOjVSjlYeRQakiI1FO2cgke8mUCS/zToDfSysxqdKlFJicExLYpo3kcQx7XEd4B0WRLK1jS55DWgXJJAAHWSeCr7lBo4IGUUlGyNlQKunZAYg1rnNc6z2DLqWFl79GikHKN/wBKrf7tL/CVNIkUbw4AtIIIuCNQQeBBX0tTss8eBUwuL+Dw6X/7bVtlNDxqqlkTS+V7WNHFzyGtHeToviir4pwXQyMkA0JY5rx6S0qO7cYE6sfTOilhbLTSOmZFUDPFLzcpzMBB0vo4XtdY2xuJZqyqpZaWnhqImRPkkpiHRyNObIHHKHNcNeab8VdchK6qviiIEsjGX1GdzW37rnVfdNUxyjNG9rxe12ODhfquFA9tIHSYvRNjZA9xpqrm1F93bNHcmwOvUplgdOY4WtcyFjtS5tOLRXJ+DoDwtxCTHIek+JwRuySTRNcPgue1p17CbrKzC176cb9CqTH5Hx4jikjaSGpY2KjEgl13bCyQGRrA1xeBqXAWNgLXU/2IoG0+H08TZRM0RgiRviODucMl78wA2A6gkxobmCdkjQ+NzXNPBzSHA9xGi/YJ2SNzxua5p4FpDgbdoVTV9XNhhrMGgBDquVjqI9DWVZLZgL/uyHu4nirQwbDWUlPFTRCzIWNjb3NFrntPH0pMaGRBOyQZmOa4XIu0hwuOIuOledbXRQAGaRkYOgL3NYD3ZiolySf/AEH/AN7q/wCc5Y2Axxz4tiArWsdNGY207ZQDlpy2+aJrtLF17kdPFNCdwTNe0PY4OadQWkEHuI4rFdjFMDlM8IINrGRl78LWvxXrQQxRsDIGsaxpIAjADQbnNYN0Gt79t1WmwdC+Q1DhDRPjGIVOZ04JmtvATk5pHdcpEKtO6woMYppH7uOeFz+GVsjHO9QN15bRUjailmhfKYmyxujMgIaWhwtmudFBqYSYZJRU9XTUE0bpo6aGaBojmY8jKx5jcD0cS12iRG0WYiBFAREQEREBERAREQEREHxJGHAhwBB0IOoWirtlYn6xkxnqGrfUeHoKkCLlkw0yRq0bSYieqETbJTjxXMd6S0+xeHuVqepn2v6KfIvm/Z2H9WPKqg8Gx0x8d7G913H7luKLZKCPV95D87Rv2Rx9N1IEXSnB4qdIWMdYfEcYaMrQABwAFgvtEX1NiIiDU4pszRVbxJU0sMrxpmexrnWHQSRcjsK2UEDY2hjGhrWgNa1oDWgDQAAaAL0RBpvcpQ73f+CQbzNvM+7ZfN8fh43bxW4C/UQYLMHpxE6nEMe6kzF0eUZHZzd2ZvA3OpWTTU7YmNjjaGsYAxrWiwAAsAB0ABeqIPDwOPe7/I3eZN1ntzsl82W/VfWy+qqnZKx0cjQ5j2ljmuFw5rhYgjpBC9UQYM2EU7xE10MZEBDortHvZaLAs+LpposuWMPaWuALXAggi4IOhBB4hfaINPhuy9FSv3tPSwRvsQHMja1wB1Iabc0dgWyq6VkzHRStD2PBa5rhdpB4gg8QvZEGnw3ZahpZBLT0kETwCA9kbWuseIuAtwiINdi+B01YAKqCKXL4u8aHFvmk6t9C+8Jweno2GOmhjiaTmIjaG3PC5txPaVnIg1mLbP0lYWmqp4piwENMjGvsDxAuNOC9cKwinpGmOlhjia52ctjaGAusBcgdNgPUs5EGLFh8TZHytjaJJQ0PcAMzwy4aHHptc+tfuH4fFTMEUEbY2AkhjAGtBcbmwGguST6VkogxJ8OhklZO+NjpYg4MeWgvYHaOyu4i6y0RBjUFBFTtyQxtjaXOfZgDRmcbuNh0krGxfAaWst4VTxS5fF3jGuIvxsTqFskQY1BQRU7BFBGyONt7MjaGNFzc2A046rUzbFYa9xe+hpnOcS5xMTCSSbkk21N1v0QeFRSxyMMUjGvY4ZSxwDmkdRadCFrcL2VoaWTe09LDG/UBzGNDgDxDT8EdgW5RAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q==",
    alt: "Astrantia Garden Service",
  },
]

const Partners: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const items = container.querySelectorAll(".partner-item")
    const itemCount = items.length

    // Clone items to create seamless loop
    items.forEach((item) => {
      const clone = item.cloneNode(true)
      container.appendChild(clone)
    })

    // Reset animation when it completes
    const handleAnimationIteration = () => {
      container.style.animation = "none"
      setTimeout(() => {
        container.style.animation = ""
      }, 10)
    }

    container.addEventListener("animationiteration", handleAnimationIteration)

    return () => {
      container.removeEventListener("animationiteration", handleAnimationIteration)
    }
  }, [])

  return (
    <section className="w-full bg-green-800 py-16 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-left">Our Partners</h2>

        {/* Slider Wrapper */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-12 whitespace-nowrap"
            style={{
              animation: "infiniteSlide 30s linear infinite",
            }}
          >
            {/* Initial set of logos */}
            {partners.map((item, index) => (
              <img
                key={index}
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                className="partner-item h-20 w-auto object-contain bg-white rounded-lg shadow p-3 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infiniteSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

export default Partners
